import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('admin', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    SET_ORDERS_DATA: 'SET_ORDERS_DATA',
});

export { types as adminActionTypes };

export const adminActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),

    setOrdersData: createAction(types.SET_ORDERS_DATA),
};
