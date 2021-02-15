import { prefixTypes, createAction } from '../utils';
import { create } from 'lodash';


const types = prefixTypes('admin', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    SET_ORDERS_DATA: 'SET_ORDERS_DATA',
    GET_ORDERS: 'GET_ORDERS',

    SET_CHECK_DATA: 'SET_CHECK_DATA',
    SET_IS_TRANSFERRED: 'SET_IS_TRANSFERRED',
    SET_IS_TRANSFER_AGREEMENT: 'SET_IS_TRANSFER_AGREEMENT',
    GET_CHECK_DATA: 'GET_CHECK_DATA', // sagas
});

export { types as adminActionTypes };

export const adminActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),

    setOrdersData: createAction(types.SET_ORDERS_DATA),
    getOrders: createAction(types.GET_ORDERS),

    setCheckData: createAction(types.SET_CHECK_DATA),
    setIsTransferred: createAction(types.SET_IS_TRANSFERRED),
    setIsTransferAgreement: createAction(types.SET_IS_TRANSFER_AGREEMENT),
    getCheckData: createAction(types.GET_CHECK_DATA),
};
