import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';


const defaultState = {
    busy: false,
    orders: [],
};

export const reducer = lookupTableReducer(defaultState, {
    [adminActionTypes.CLEAR_ALL]: state => ({
        ...defaultState,
        busy: state.busy,
    }),
    [adminActionTypes.SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
    [adminActionTypes.SET_ORDERS_DATA]: (state, newOrders) => ({
        ...state,
        orders: newOrders,
    }),
});
