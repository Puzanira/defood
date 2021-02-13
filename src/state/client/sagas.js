import { put, takeLatest, takeEvery } from 'redux-saga/effects';

import { clientActions, clientActionTypes } from './actions';


function* setBusy(value) {
    yield put(clientActions.setStatus({ busy: value }));
}

/*
    All your functions to call from pages or components
    Register them to sagas to use later
 */

export const sagas = [
    // takeLatest(repoActionTypes.UPDATE_FILES, updateFiles),
    // takeLatest(repoActionTypes.GO_TO_DIRECTORY, goToDirectory),
    // takeLatest(repoActionTypes.GO_FORWARD_TO_DIRECTORY, goForwardToDirectory),
    // takeEvery(repoActionTypes.TOGGLE_CHECKED_FOLDER, toggleCheckedFolder),
    // takeEvery(repoActionTypes.TOGGLE_CHECKED_FILE, toggleCheckedFile),
];
