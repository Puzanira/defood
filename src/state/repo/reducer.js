import _ from 'lodash';

import { lookupTableReducer } from '../utils';
import { repoActionTypes } from './actions';


const defaultState = {
    busy: false,
    repo: null,
    repoTree: null,
    totalCloc: 0,
    currentDirectoryName: '',
    folderFileMap: {},
    checkedFiles: [],
    checkedFolders: [],
};

export const reducer = lookupTableReducer(defaultState, {
    [repoActionTypes.CLEAR_ALL]: state => ({
        ...defaultState,
        busy: state.busy,
    }),
    [repoActionTypes.SET_REPO]: (state, repo) => ({
        ...state,
        repo,
    }),
    [repoActionTypes.SET_REPO_TREE]: (state, repoTree) => ({
        ...state,
        repoTree,
    }),
    [repoActionTypes.SET_FOLDER_FILE_MAP]: (state, folderFileMap) => ({
        ...state,
        folderFileMap: {
            ...state.folderFileMap,
            ...folderFileMap,
        },
    }),
    [repoActionTypes.SET_CURRENT_DIRECTORY]: (state, currentDirectory) => ({
        ...state,
        currentDirectory,
    }),
    [repoActionTypes.SET_CURRENT_DIRECTORY_CONTENT]: (state, currentDirectoryContent) => ({
        ...state,
        currentDirectoryContent,
    }),
    [repoActionTypes.SET_TOTAL_CLOC]: (state, totalCloc) => ({
        ...state,
        totalCloc,
    }),
    [repoActionTypes.SET_CHECKED_FILE]: (state, filename) => ({
        ...state,
        checkedFiles: [
            ...state.checkedFiles,
            filename,
        ],
    }),
    [repoActionTypes.SET_CHECKED_FILES]: (state, filenames) => ({
        ...state,
        checkedFiles: [
            ...state.checkedFiles,
            ...filenames,
        ],
    }),
    [repoActionTypes.REMOVE_CHECKED_FILE]: (state, filename) => ({
        ...state,
        checkedFiles: _.without(state.checkedFiles, filename),
    }),
    [repoActionTypes.REMOVE_CHECKED_FILES]: (state, filenames) => ({
        ...state,
        checkedFiles: _.without(state.checkedFiles, ...filenames),
    }),
    [repoActionTypes.SET_CHECKED_FOLDER]: (state, folderName) => ({
        ...state,
        checkedFolders: [
            ...state.checkedFolders,
            folderName,
        ],
    }),
    [repoActionTypes.SET_CHECKED_FOLDERS]: (state, folderNames) => ({
        ...state,
        checkedFolders: [
            ...state.checkedFolders,
            ...folderNames,
        ],
    }),
    [repoActionTypes.REMOVE_CHECKED_FOLDER]: (state, folderName) => ({
        ...state,
        checkedFolders: _.without(state.checkedFolders, folderName),
    }),
    [repoActionTypes.REMOVE_CHECKED_FOLDERS]: (state, folders) => ({
        ...state,
        checkedFolders: _.without(state.checkedFolders, ...folders),
    }),
    [repoActionTypes.SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
});
