import { lookupTableReducer } from '../utils';
import { deliveryActionTypes } from './actions';


const defaultState = {
    busy: false,
    orders: [],
    currentOrder: {},
};

export const reducer = lookupTableReducer(defaultState, {
    [deliveryActionTypes.DELIVERY_CLEAR_ALL]: state => ({
        ...defaultState,
        busy: state.busy,
    }),
    [deliveryActionTypes.DELIVERY_SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
    [deliveryActionTypes.DELIVERY_SET_ORDERS]: (state, orders) => ({
        ...state,
        orders,
    }),
    [deliveryActionTypes.DELIVERY_SET_ORDER]: (state, order) => ({
        ...state,
        currentOrder: order,
    }),
});
