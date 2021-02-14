import { put, takeLatest, takeEvery } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { data as newOrdersData } from '../../store/admin-mock-data';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* setOrdersData() {
    yield put(adminActions.setOrdersData(newOrdersData));
}

export const sagas = [
    takeEvery(adminActionTypes.SET_ORDERS_DATA, setOrdersData),
];
