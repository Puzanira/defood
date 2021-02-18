import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { deliveryActions, deliveryActionTypes } from './actions';
import { pagedDeliveryData, deliveryOrderMock } from '../../store/admin-mock-data';
import { orderStatusMap } from './deals';


function* setBusy(value) {
    yield put(deliveryActions.setStatus({ busy: value }));
}

function* getOrders() {
    // Запрос на получение всех данных для списка доставки
    yield put(deliveryActions.setOrders(pagedDeliveryData.data));
}

// actionType one of 'onSuccess', 'onReject'
function* updateNextStatus({ $payload: { actionType } }) {
    const currentOrder = yield select(
        ({ delivery }) => delivery.currentOrder,
    );
    const currentStatus = currentOrder.status;
    const nextStatus = orderStatusMap[currentStatus].next[actionType];
    // call API updateStatus
    yield put(deliveryActions.setOrder(
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

function* createOrder({ $payload: { params } }) {
    // After calling createOrder API we get a queueId and localDealId

    // const response = { queueId: 'QUEUEID', localDealId: 'LOCALDEALID' };
    const response = { queueId: 'QUEUEID', localDealId: '3321' };
    const { queueId, localDealId } = response;

    yield put(deliveryActions.setOrder(
        { queueId, localDealId, parameters: { ...params }, status: 'created', history: [] },
    ));

    yield updateNextStatus({ $payload: { actionType: 'onSuccess' } });
}

function* getOrder({ $payload: { id } }) {
    // call API getOrder
    const order = deliveryOrderMock;
    yield put(deliveryActions.setOrder(
        { ...order },
    ));
}

export const sagas = [
    takeLatest(deliveryActionTypes.DELIVERY_GET_ORDERS, getOrders),
    takeEvery(deliveryActionTypes.DELIVERY_GET_ORDER, getOrder),
    takeEvery(deliveryActionTypes.DELIVERY_CREATE_ORDER, createOrder),
    takeEvery(deliveryActionTypes.DELIVERY_UPDATE_NEXT_STATUS, updateNextStatus),
];
