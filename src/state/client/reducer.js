import _ from 'lodash';

import { lookupTableReducer } from '../utils';
import { clientActions, clientActionTypes } from './actions';


const defaultState = {
    busy: false,
    order: [],
    items: [],
    waiting: 0,
    formData: {},
    ticket: {},
    orders: {},
};

export const reducer = lookupTableReducer(defaultState, {
    [clientActionTypes.CLEAR_ALL]: state => ({
        ...defaultState,
        busy: state.busy,
    }),
    [clientActionTypes.SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
    [clientActionTypes.ADD_ORDER_ITEM]: (state, item) => ({
        ...state,
        order: [
            ...state.order,
            item,
        ],
    }),
    [clientActionTypes.SET_ITEMS]: (state, items) => ({
       ...state,
       items: [
           ...items,
       ],
    }),
    [clientActionTypes.REMOVE_ORDER_ITEM]: (state, item) => ({
        ...state,
        order: _.without(state.order, item),
    }),
    [clientActionTypes.SET_FORM_DATA]: (state, formData) => ({
        ...state,
        formData,
    }),
    [clientActionTypes.SET_WAITING_STATUS]: (state, value) => ({
        ...state,
        waiting: value,
    }),
    [clientActionTypes.SET_TICKET_DATA]: (state, data) => ({
        ...state,
        ticket: data,
    }),

    [clientActionTypes.SET_ORDER]: (state, order) => ({
        ...state,
        orders: {
            ...state.orders,
            [order.id]: order,
        },
    }),
    [clientActionTypes.SET_ORDERS]: (state, orders) => ({
        ...state,
        orders,
    }),
    [clientActionTypes.SET_ORDER_STATUS]: (state, orderId, orderStatus) => ({
        state,
        orders: {
            ...state.orders,
            [orderId.status]: orderStatus,
        },
    }),
    [clientActionTypes.SET_NEW_STATUS]: (state, data) => {
        const { id, status } = data;
        const orders = { ...state.orders };

        if (orders.hasOwnProperty(id))
            orders[id].status = status;

        return {
            ...state,
            orders,
        };
    },
});
