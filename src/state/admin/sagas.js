import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { ordersActions } from '../orders/actions';
import { getDeals, getDeal } from '../../core/deals/state/sagas';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrder({ $payload: { id } }) {
    yield setBusy(true);
    const order = yield getDeal({ dealId: id });
    yield put(adminActions.setOrder({ ...order }));
    yield setBusy(false);
}

function* getOrders() {
    yield setBusy(true);
    const orders = yield getDeals();
    if (orders && orders.data)
        yield put(adminActions.setOrders(orders.data));
    yield setBusy(false);
}

function* updateOrder({ $payload: { order } }) {
    const currentOrder = yield select(
        ({ admin }) => admin.currentOrder,
    );
    if (currentOrder.localDealId.toString() === order.localDealId.toString())
        yield put(adminActions.setOrder({ ...order }));
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
