import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('delivery', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    DELIVERY_SET_ORDERS: 'DELIVERY_SET_ORDERS',
    DELIVERY_GET_ORDERS: 'DELIVERY_GET_ORDERS',

    DELIVERY_UPDATE_NEXT_STATUS: 'DELIVERY_UPDATE_NEXT_STATUS',
    DELIVERY_UPDATE_ORDER_PARAMETERS: 'DELIVERY_UPDATE_ORDER_PARAMETERS',
    DELIVERY_CREATE_ORDER: 'DELIVERY_CREATE_ORDER',
    DELIVERY_GET_ORDER: 'DELIVERY_GET_ORDER',
    DELIVERY_UPDATE_ORDER: 'DELIVERY_UPDATE_ORDER',
    DELIVERY_SET_ORDER: 'DELIVERY_SET_ORDER',
});

export { types as deliveryActionTypes };

export const deliveryActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),

    setOrders: createAction(types.DELIVERY_SET_ORDERS),
    getOrders: createAction(types.DELIVERY_GET_ORDERS),

    updateNextStatus: createAction(types.DELIVERY_UPDATE_NEXT_STATUS),
    updateOrderParameters: createAction(types.DELIVERY_UPDATE_ORDER_PARAMETERS),
    createOrder: createAction(types.DELIVERY_CREATE_ORDER),
    getOrder: createAction(types.DELIVERY_GET_ORDER),
    updateOrder: createAction(types.DELIVERY_UPDATE_ORDER),
    setOrder: createAction(types.DELIVERY_SET_ORDER),
};
