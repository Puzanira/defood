import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('admin', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    SET_ORDERS: 'SET_ORDERS',
    GET_ORDERS: 'GET_ORDERS',

    UPDATE_NEXT_STATUS: 'UPDATE_NEXT_STATUS',
    UPDATE_ORDER_PARAMETERS: 'UPDATE_ORDER_PARAMETERS',
    CREATE_ORDER: 'CREATE_ORDER',
    GET_ORDER: 'GET_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDER',
    SET_ORDER: 'SET_ORDER',
});

export { types as adminActionTypes };

export const adminActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),

    setOrders: createAction(types.SET_ORDERS),
    getOrders: createAction(types.GET_ORDERS),

    updateNextStatus: createAction(types.UPDATE_NEXT_STATUS),
    updateOrderParameters: createAction(types.UPDATE_ORDER_PARAMETERS),
    createOrder: createAction(types.CREATE_ORDER),
    getOrder: createAction(types.GET_ORDER),
    updateOrder: createAction(types.UPDATE_ORDER),
    setOrder: createAction(types.SET_ORDER),
};
