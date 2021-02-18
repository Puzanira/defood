import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';


const defaultState = {
    busy: false,
    orders: [],
    currentOrder: {},
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
    [adminActionTypes.SET_ORDERS]: (state, orders) => ({
        ...state,
        orders,
    }),
    [adminActionTypes.SET_ORDER]: (state, order) => ({
        ...state,
        currentOrder: order,
    }),
});
