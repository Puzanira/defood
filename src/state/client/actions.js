import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('client', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',
    /* all your actions here */

    ADD_ORDER_ITEM: 'ADD_ORDER_ITEM',
    REMOVE_ORDER_ITEM: 'REMOVE_ORDER_ITEM',
    DELETE_ORDER_ITEM: 'DELETE_ORDER_ITEM',
    SET_ORDER_ITEM: 'SET_ORDER_ITEM',
    SET_FORM_DATA: 'SET_FORM_DATA',
    FETCH_FORM_DATA: 'FETCH_FORM_DATA',
    SET_ITEMS: 'SET_ITEMS',
    GET_ITEMS: 'GET_ITEMS',
    GET_WAITING_STATUS: 'GET_WAITING_STATUS',
    SET_WAITING_STATUS: 'SET_WAITING_STATUS',
});

export { types as clientActionTypes };

export const clientActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),
    addOrderItem: createAction(types.ADD_ORDER_ITEM),
    removeOrderItem: createAction(types.REMOVE_ORDER_ITEM),
    deleteOrderItem: createAction(types.DELETE_ORDER_ITEM),
    setOrderItem: createAction(types.SET_ORDER_ITEM),
    setFormData: createAction(types.SET_FORM_DATA),
    fetchFormData: createAction(types.FETCH_FORM_DATA),
    setItems: createAction(types.SET_ITEMS),
    getItems: createAction(types.GET_ITEMS),
    getWaitingStatus: createAction(types.GET_WAITING_STATUS),
    setWaitingStatus: createAction(types.SET_WAITING_STATUS),
};