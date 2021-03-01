import { put, takeLatest, takeEvery, select } from 'redux-saga/effects';

import { PizzaArray, UserData } from '../../store/client-mock-data';
import { clientActions, clientActionTypes } from './actions';
import { adminActions } from '../admin/actions';
import { config } from '../../config';


function* setOrderInProgress(value) {
    yield put(clientActions.setStatus({ orderInProgress: value }));
}

function* setOrderItem({ $payload: { item } }) {
    yield put(clientActions.addOrderItem(item));
}

function* setAddress({ $payload: { address } }) {
    yield put(clientActions.setAddress(address));
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
function* fetchFormData({ $payload: { formData, history } }) {
    const order = yield select(
        ({ client }) => client.order,
    );
    const address = yield select(
        ({ client }) => client.address,
    );

    const total = order.reduce((acc, item) => acc + Number(item.price), 0);

    const orderData = order.map(item => ({
          baker: item.baker,
          title: item.title,
          price: item.price,
          size: item.size,
        }));

    const clientContacts = {
        addressTo: config.zone[address],
        tel: formData.number,
        name: formData.name,
    };

    const parameters = {
        orderData,
        total,
        addressTo: config.zone[address],
        clientContacts,
    };

    // Очищаем форму и перенаправляем на другую страницу
    yield put(clientActions.removeOrder());
    history.push('/check/');

    yield put(adminActions.createOrder({ parameters }));
}

function* emptyTrash() {
    yield put(clientActions.setIsOrderCreated('disabled'));
    yield put(clientActions.removeOrder());
}

export const sagas = [
    takeEvery(clientActionTypes.DELETE_ORDER_ITEM, deleteOrderItem),
    takeEvery(clientActionTypes.SET_ORDER_ITEM, setOrderItem),
    takeLatest(clientActionTypes.FETCH_FORM_DATA, fetchFormData),
    takeLatest(clientActionTypes.UPDATE_ADDRESS, setAddress),
    takeLatest(clientActionTypes.GET_ITEMS, getItems),
    takeLatest(clientActionTypes.GET_TICKET_DATA, getTicketData),
    takeLatest(clientActionTypes.EMPTY_TRASH, emptyTrash),
    takeEvery(clientActionTypes.SET_ORDER_IN_PROGRESS, setOrderInProgress),
];
