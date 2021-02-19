import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { adminActions, adminActionTypes } from './actions';
import {
    createDeal,
    callPizza1Api,
} from './kekkerDealTransitions';
import { callNext } from './deals';
import { dealsApi } from '../../api';
import { config } from '../../config';


function* setBusy(value) {
    yield put(adminActions.setStatus({ busy: value }));
}

function* getOrders() {
    const orders = yield callPizza1Api(dealsApi.getDeals);
    if (orders && orders.data)
        yield put(adminActions.setOrders(orders.data));
}

// actionType one of 'success', 'reject'
function* updateNextStatus({ $payload: { actionType } }) {
    const currentOrder = yield select(
        ({ admin }) => admin.currentOrder,
    );
    yield setBusy(true);
    const updatedOrder = yield callNext({ order: currentOrder, actionType });
    yield put(adminActions.setOrder(updatedOrder));
    yield setBusy(false);
}

function* createOrder({ $payload: { orderData } }) {
    const initiator = config.nodes.PIZZA1;
    const orderDeal = {
        kind: 'FirstDeal',
            status: 'created',
        parties: [
            {
                key: initiator,
                role: 'Sender',
            },
        ],
        parameters: orderData,
    };
    yield createDeal({ deal: orderDeal });
}

function* getOrder({ $payload: { id } }) {
    const order = yield callPizza1Api(dealsApi.getDeal, { id });
    yield put(adminActions.setOrder(
        { ...order },
    ));
}

export const sagas = [
    takeLatest(adminActionTypes.GET_ORDERS, getOrders),
    takeEvery(adminActionTypes.GET_ORDER, getOrder),
    takeEvery(adminActionTypes.CREATE_ORDER, createOrder),
    takeEvery(adminActionTypes.UPDATE_NEXT_STATUS, updateNextStatus),
];
