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
    yield put(adminActions.clearCheckStatuses());
}

function* setIsTransferredData({ $payload: { isTransferred } }) {
    // Запрос на перенаправление продукта в другой отдел
    yield put(adminActions.setIsTransferred(isTransferred));
}

function* setIsTransferAgreementData({ $payload: { agreement } }) {
    // Запрос на подтверждение "принять"/"отклонить" в всплывающем меню
    yield put(adminActions.setIsTransferAgreement(agreement));
}

function* setMarkeredPoint({ $payload: { id, value, isSelected } }) {
    if (!isSelected) {
        // Запрос на добавление статуса (у меня списочек со статусами)
        const date = new Date();
        const time = date.toTimeString(date.getTime).split(' ')[0];

        yield put(adminActions.setStatusMarker(Number(id)));
        yield put(adminActions.setItemToActiveList({ id, value, time }));
    }
}

function* setIsTransferredActivity() {
    const date = new Date();

    yield put(adminActions.createCopiesOfLists());
    yield put(adminActions.blockAllValuesOfStatuses());
    yield put(adminActions.deleteIsAvailableByIndex('Создан'));
    yield put(adminActions.setItemToActiveList({ id: 10, value: 'Передан в другой пункт', time: date.toTimeString(date.getTime).split(' ')[0] }));
}

export const sagas = [
    // takeEvery(adminActionTypes.SET_ORDERS_DATA, getOrders),
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeLatest(adminActionTypes.GET_CHECK_DATA, getCheckData),
    takeEvery(adminActionTypes.SET_IS_TRANSFERRED_DATA, setIsTransferredData),
    takeEvery(adminActionTypes.SET_IS_TRANSFER_AGREEMENT_DATA, setIsTransferAgreementData),
    takeEvery(adminActionTypes.SET_MARKERED_POINT, setMarkeredPoint),
    takeEvery(adminActionTypes.SET_IS_TRANSFERRED_ACTIVITY, setIsTransferredActivity),
];
