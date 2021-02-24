import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import { dealsActions } from '../deals/actions';
import { callNext } from '../deals/sagas';
import { getDeals, getDeal } from '../deals/core/sagas';
import { getCurrentAction } from '../deals/helpers';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrder({ $payload: { id } }) {
    const order = yield getDeal({ dealId: id });
    const nextAction = getCurrentAction(order);

    yield put(adminActions.setOrder({ ...order }));
    yield put(adminActions.setOrderAction(nextAction));
}

function* getOrders() {
    const orders = yield getDeals();
    if (orders && orders.data)
        yield put(adminActions.setOrders(orders.data));
}

function* updateNextStatus() {
    const currentOrder = yield select(
        ({ admin }) => admin.currentOrder,
    );
    yield setBusy(true);
    const [updatedOrder, nextAction] = yield callNext({ deal: currentOrder });
    yield put(adminActions.setOrder(updatedOrder));
    yield put(adminActions.setOrderAction(nextAction));
    yield setBusy(false);
}

function* createOrder({ $payload: { parameters } }) {
    yield put(dealsActions.createOrderDeal({ parameters }));
}

export const sagas = [
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeEvery(adminActionTypes.GET_ORDER, getOrder),
    takeEvery(adminActionTypes.CREATE_ORDER, createOrder),
    takeEvery(adminActionTypes.UPDATE_NEXT_STATUS, updateNextStatus),
];
