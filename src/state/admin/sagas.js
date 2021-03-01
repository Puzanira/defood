import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { ordersActions } from '../orders/actions';
import { getDeals, getDeal } from '../../core/deals/state/sagas';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrder({ $payload: { id } }) {
    const order = yield getDeal({ dealId: id });
    yield put(adminActions.setOrder({ ...order }));
}

function* getOrders() {
    const orders = yield getDeals();
    if (orders && orders.data)
        yield put(adminActions.setOrders(orders.data));
}

function* updateOrder({ $payload: { order } }) {
    yield put(adminActions.setOrder(order));
}

function* createOrder({ $payload: { parameters } }) {
    yield put(ordersActions.createOrderDeal({ parameters }));
}

export const sagas = [
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeEvery(adminActionTypes.GET_ORDER, getOrder),
    takeEvery(adminActionTypes.CREATE_ORDER, createOrder),
    takeEvery(adminActionTypes.UPDATE_ORDER, updateOrder),
];
