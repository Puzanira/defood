import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { PizzaArray, UserData } from '../../store/client-mock-data';

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

// Запрос на получение заказа
function* getTicketData({ $payload: { id } }) {
    yield put(clientActions.setTicketData(UserData));
}

// API для отправки формы
function* fetchFormData({ $payload: { formData } }) {
    const order = yield select(
        ({ client }) => client.order,
    );

    const total = order.reduce((acc, item) => acc + Number(item.price), 0);

    const orderData = order.map(item => ({
          title: item.title,
          price: item.price,
          size: item.size,
        }));

    const clientContacts = {
        addressTo: formData.address,
        tel: formData.number,
        name: formData.name,
    };

    const params = { orderData, total, clientContacts };

    yield put(clientActions.setFormData(formData));
}

export const sagas = [
    takeEvery(clientActionTypes.DELETE_ORDER_ITEM, deleteOrderItem),
    takeEvery(clientActionTypes.SET_ORDER_ITEM, setOrderItem),
    takeLatest(clientActionTypes.FETCH_FORM_DATA, fetchFormData),
    takeLatest(clientActionTypes.GET_ITEMS, getItems),
    takeLatest(clientActionTypes.GET_WAITING_STATUS, getWaitingStatus),
    takeLatest(clientActionTypes.GET_TICKET_DATA, getTicketData),
];
