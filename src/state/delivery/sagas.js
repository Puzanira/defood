import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { deliveryActionTypes } from './actions';
import { adminActions } from '../admin/actions';
import { dealsActions } from '../deals/actions';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrder({ $payload: { id } }) {
    const order = yield put(dealsActions.getDeal({ id }));
    yield put(adminActions.setOrder(
        { ...order },
    ));
}

function* getOrders() {
    const orders = yield put(dealsActions.getDeals());
    if (orders && orders.data)
        yield put(adminActions.setOrders(orders.data));
}

// actionType one of 'success', 'reject'
function* updateNextStatus({ $payload: { actionType } }) {
    const currentOrder = yield select(
        ({ admin }) => admin.currentOrder,
    );
    yield setBusy(true);
    const updatedOrder = yield put(dealsActions.callOrderNext({ deal: currentOrder, actionType }));
    yield put(adminActions.setOrder(updatedOrder));
    yield setBusy(false);
}

function* createOrder({ $payload: { parameters } }) {
    yield put(dealsActions.createOrderDeal({ orderData: parameters }));
}

export const sagas = [
    takeLatest(deliveryActionTypes.DELIVERY_GET_ORDERS, getOrders),
    takeEvery(deliveryActionTypes.DELIVERY_GET_ORDER, getOrder),
    takeEvery(deliveryActionTypes.DELIVERY_CREATE_ORDER, createOrder),
    takeEvery(deliveryActionTypes.DELIVERY_UPDATE_NEXT_STATUS, updateNextStatus),
];
