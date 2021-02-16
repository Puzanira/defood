import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { PizzaArray } from '../../store/client-mock-data';

import { clientActions, clientActionTypes } from './actions';


function* setBusy(value) {
    yield put(clientActions.setStatus({ busy: value }));
}

function* setOrderItem({ $payload: { item } }) {
    yield put(clientActions.addOrderItem(item));
}

// API для отслеживание статуса
function* getWaitingStatus() {
    yield put(clientActions.setWaitingStatus(0));
}

// API для получение списка пицц
function* getItems() {
    yield put(clientActions.setItems(PizzaArray));
}

function* deleteOrderItem({ $payload: { item } }) {
    yield put(clientActions.removeOrderItem(item));
}

// API для отправки формы
function* fetchFormData({ $payload: { formData } }) {
    yield put(clientActions.setFormData(formData));
}

export const sagas = [
    takeEvery(clientActionTypes.DELETE_ORDER_ITEM, deleteOrderItem),
    takeEvery(clientActionTypes.SET_ORDER_ITEM, setOrderItem),
    takeLatest(clientActionTypes.FETCH_FORM_DATA, fetchFormData),
    takeLatest(clientActionTypes.GET_ITEMS, getItems),
    takeLatest(clientActionTypes.GET_WAITING_STATUS, getWaitingStatus),
];
