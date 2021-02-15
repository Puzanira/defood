import { put, takeLatest, takeEvery } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { data as newOrdersData, checkData } from '../../store/admin-mock-data';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrders() {
    // Запрос на получение всех данных для списка
    yield put(adminActions.setOrdersData(newOrdersData));
}

function* getCheckData() {
    // Запрос на получение данных для конкретного заказа
    yield put(adminActions.setCheckData(checkData));
    yield put(adminActions.setIsTransferred(false));
    yield put(adminActions.setIsTransferAgreement(true));
}

export const sagas = [
    // takeEvery(adminActionTypes.SET_ORDERS_DATA, getOrders),
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeLatest(adminActionTypes.GET_CHECK_DATA, getCheckData),
];
