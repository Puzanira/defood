import { takeLatest, put, select, takeEvery } from 'redux-saga/effects';
import fp from 'lodash/fp';
import _ from 'lodash';

import { repo as repoAPI } from '../../api';
import { repoActionTypes, repoActions } from './actions';
import {
    getFileTreeObjectFromFilenames,
    getFlattenFolderContainment, getFullFilename, getPropNameFromFullFilename,
} from '../../utils';
import { callApi } from '../../api/apiCaller';
import { messagingActions } from '../../core/messaging';


function* setBusy(value) {
    yield put(repoActions.setStatus({ busy: value }));
}

// Check if every file in folder is checked
function* checkAllFolderFiles() {
   const foldersToCheck = [];
   const foldersToRemove = [];
    const foldersWithFiles = {};
    const folderFiles = [];

    const currentDirectoryName = yield select(
        ({ repo }) => repo.currentDirectory,
    );
    const repoTree = yield select(
        ({ repo }) => repo.repoTree,
    );
    const checkedFiles = yield select(
        ({ repo }) => repo.checkedFiles,
    );

    const folderFullName = getFullFilename(currentDirectoryName);
    const folderPropName =
        getPropNameFromFullFilename(currentDirectoryName);
    const folder = _.get(repoTree, folderPropName, repoTree);

    const subFolder = Object.entries(folder)
        .filter(([key, value]) => value !== 'file');

    subFolder.forEach(([subFolderName, subFolderContent]) => {
        // We can simply use regexp file comparison instead of tree walk
        const subfolderFullName = getFullFilename(`${subFolderName}`, currentDirectoryName);
        const allFolderFiles =
            getFlattenFolderContainment(subFolderContent, subfolderFullName);
        foldersWithFiles[subfolderFullName] = allFolderFiles;
        folderFiles.push(...allFolderFiles);

        if (fp.intersection(allFolderFiles, [...checkedFiles])
            .length === allFolderFiles.length) { // All checked
            foldersToCheck.push(subfolderFullName);
        } else
            foldersToRemove.push(subfolderFullName);
    });

    if (subFolder.length === foldersToCheck.length)
        foldersToCheck.push(folderFullName);
    else
        foldersToRemove.push(folderFullName);

    const folderIndexFiles = Object.entries(folder)
        .filter(([key, value]) => value === 'file')
        .map(([key, value]) => getFullFilename(key, folderFullName));

    folderFiles.push(...folderIndexFiles);
    foldersWithFiles[folderFullName] = folderFiles;

    yield put(repoActions.setCheckedFolders(foldersToCheck));
    yield put(repoActions.removeCheckedFolders(foldersToRemove));
    yield put(repoActions.setFolderFileMap(foldersWithFiles));

    return folderFiles;
}

function* parseFiles(files) {
    const filenames = [];
    const checkedFiles = [];
    let totalCloc = 0;

    Object.values(files).forEach(file => {
        if (file.filename === 'SUM')
            totalCloc = file.code;
        else {
            filenames.push(file.filename);
            if (!file.excluded)
                checkedFiles.push(file.filename);
        }
    });

    yield put(repoActions.setTotalCloc(totalCloc));

    const repoTree = getFileTreeObjectFromFilenames(filenames);

    yield put(repoActions.setRepoTree(repoTree));
    yield put(repoActions.setCheckedFiles(checkedFiles));

    if (filenames.length === checkedFiles.length) {
        const subFolderNames = [];
        const subFolders = Object.entries(repoTree)
            .filter(([key, value]) => value !== 'file');
        subFolders.forEach(([subFolderName, subFolderContent]) =>
            subFolderNames.push(subFolderName));
        yield put(repoActions.setCheckedFolders(subFolderNames));
        return;
    }

    yield checkAllFolderFiles('');
}

function* parseCurrentDirectoryContent() {
    const currentDirectoryName = yield select(
        ({ repo }) => repo.currentDirectory,
    );
    const repoTree = yield select(
        ({ repo }) => repo.repoTree,
    );

    const getPropertyName = getPropNameFromFullFilename(currentDirectoryName);
    const dir = _.get(repoTree, getPropertyName, repoTree);

    const iter = ([key, value]) =>
        value === 'file' ? [key, value] : [key, 'folder'];

    const dirContent = fp.pipe(
        fp.entries,
        fp.map(iter),
        fp.remove(([key, value]) => key === 'SUM'),
        fp.orderBy(([key, value]) => value, ['desc']),
    )(dir);

    yield put(repoActions.setCurrentDirectoryContent(dirContent));
}

function* getRepo({ $payload: { formData } }) {
    yield setBusy(true);

    try {
        yield put(repoActions.clearAll());

        const repo = yield callApi(repoAPI.getRepo, { formData });
        yield put(repoActions.setRepo(repo));

        if (!repo.files)
            return;

        yield parseFiles(repo.files);
        yield parseCurrentDirectoryContent();
    } catch (error) {
        console.log(error);
        yield put(messagingActions.showNotification({
            content: error.message,
        }));
    }
    yield setBusy(false);
}

function* toggleCheckedFile({ $payload: { filename, checked } }) {
    const currentDirectoryName = yield select(
        ({ repo }) => repo.currentDirectory,
    );

    const fullFilename = getFullFilename(filename, currentDirectoryName);

    if (checked)
        yield put(repoActions.removeCheckedFile(fullFilename));
    else
        yield put(repoActions.setCheckedFile(fullFilename));
}

function* toggleCheckedFolder({ $payload: { folderName, checked } }) {
    const currentDirectoryName = yield select(
        ({ repo }) => repo.currentDirectory,
    );
    const folderFileMap = yield select(
        ({ repo }) => repo.folderFileMap,
    );

    const fillFolderName = getFullFilename(folderName, currentDirectoryName);

    const files = folderFileMap[fillFolderName]
        ? folderFileMap[fillFolderName]
        : yield checkAllFolderFiles(folderName);

    if (checked) {
        yield put(repoActions.removeCheckedFolder(fillFolderName));
        yield put(repoActions.removeCheckedFiles(files));
    } else {
        yield put(repoActions.setCheckedFolder(fillFolderName));
        yield put(repoActions.setCheckedFiles(files));
    }
}

function* goToDirectory({ $payload: { folderName } }) {
    yield put(repoActions.setCurrentDirectory(folderName));
    yield parseCurrentDirectoryContent();
    yield checkAllFolderFiles(folderName);
}

function* goForwardToDirectory({ $payload: { folderName } }) {
    const currentDirectoryName = yield select(
        ({ repo }) => repo.currentDirectory,
    );
    const fullFolderName =
        getFullFilename(folderName, currentDirectoryName);

    yield goToDirectory({ $payload: { folderName: fullFolderName } });
}

function* updateFiles() {
    yield setBusy(true);

    try {
        const repo = yield select(
            ({ repo }) => repo.repo,
        );
        const checkedFiles = yield select(
            ({ repo }) => repo.checkedFiles,
        );

        const allFiles = fp.pipe(
            fp.values,
            fp.map(file => file.filename),
            fp.remove(filename => filename === 'SUM'),
        )(repo.files);

        const excludedFiles = _.difference(allFiles, checkedFiles);

        const repo1 = yield callApi(repoAPI.excludeFiles, {
            id: repo._id,
            filenames: excludedFiles,
        });

        const updatedRepo = yield callApi(repoAPI.includeFiles, {
            id: repo._id,
            filenames: checkedFiles,
        });

        yield put(repoActions.clearAll());
        yield put(repoActions.setRepo(updatedRepo));

        if (!updatedRepo.files)
            return;

        yield parseFiles(updatedRepo.files);
        yield parseCurrentDirectoryContent();
    } catch (error) {
        console.log(error);
    }
    yield setBusy(false);
}

export const sagas = [
    takeLatest(repoActionTypes.GET_REPO, getRepo),
    takeLatest(repoActionTypes.UPDATE_FILES, updateFiles),
    takeLatest(repoActionTypes.GO_TO_DIRECTORY, goToDirectory),
    takeLatest(repoActionTypes.GO_FORWARD_TO_DIRECTORY, goForwardToDirectory),
    takeEvery(repoActionTypes.TOGGLE_CHECKED_FOLDER, toggleCheckedFolder),
    takeEvery(repoActionTypes.TOGGLE_CHECKED_FILE, toggleCheckedFile),
];
