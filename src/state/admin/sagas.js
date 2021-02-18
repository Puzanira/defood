import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { data as newOrdersData, pagedData, checkData, orderMock, orderMock2 } from '../../store/admin-mock-data';
import { orderStatusMap } from './deals';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrders() {
    // Запрос на получение всех данных для списка
    yield put(adminActions.setOrdersData(pagedData.data));
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

// actionType one of 'onSuccess', 'onReject'
function* updateNextStatus({ $payload: { actionType } }) {
    const currentOrder = yield select(
        ({ admin }) => admin.currentOrder,
    );
    const currentStatus = currentOrder.status;
    const nextStatus = orderStatusMap[currentStatus].next[actionType];
    // call API updateStatus
    yield put(adminActions.setOrder(
        {
            ...currentOrder,
            status: nextStatus,
            history: [
                ...currentOrder.history,
                {
                    status: currentStatus,
                    version: 2,
                    remark: 'REMARK',
                    executor: 'CLIENT1',
                },
            ],
        },
    ));
}

function* createOrder({ $payload: { orderData } }) {
    // After calling createOrder API we get a queueId and localDealId
    const response = { queueId: 'QUEUEID', localDealId: 'LOCALDEALID' };
    const { queueId, localDealId } = response;
    yield put(adminActions.setOrder(
    { ...orderData, queueId, localDealId },
    ));

    yield updateNextStatus({ $payload: { actionType: 'onSuccess' } });
}

function* getOrder({ $payload: { id } }) {
    // call API getOrder
    const order = orderMock2;
    yield put(adminActions.setOrder(
        { ...order },
    ));
}

export const sagas = [
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeLatest(adminActionTypes.GET_CHECK_DATA, getCheckData),
    takeEvery(adminActionTypes.SET_IS_TRANSFERRED_DATA, setIsTransferredData),
    takeEvery(adminActionTypes.SET_IS_TRANSFER_AGREEMENT_DATA, setIsTransferAgreementData),
    takeEvery(adminActionTypes.SET_MARKERED_POINT, setMarkeredPoint),
    takeEvery(adminActionTypes.SET_IS_TRANSFERRED_ACTIVITY, setIsTransferredActivity),

    takeEvery(adminActionTypes.GET_ORDER, getOrder),
    takeEvery(adminActionTypes.CREATE_ORDER, createOrder),
    takeEvery(adminActionTypes.UPDATE_NEXT_STATUS, updateNextStatus),
];
