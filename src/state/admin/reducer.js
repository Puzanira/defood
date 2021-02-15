import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';

import { checkStatuses } from '../../store/admin-mock-data';


const defaultState = {
    busy: false,
    orders: [],

    checkData: {
        data: {},
        isTransferred: false,
        isTransferAgreement: true,
    },
    checkStatuses,
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
    [adminActionTypes.SET_ORDERS_DATA]: (state, orders) => ({
        ...state,
        orders,
    }),
    [adminActionTypes.SET_CHECK_DATA]: (state, newData) => ({
        ...state,
        checkData: {
            ...state.checkData,
            data: newData,
        },
    }),
    [adminActionTypes.SET_IS_TRANSFERRED]: (state, isTransferred) => ({
        ...state,
        checkData: {
            ...state.checkData,
            isTransferred,
        },
    }),
    [adminActionTypes.SET_IS_TRANSFER_AGREEMENT]: (state, isTransferAgreement) => ({
        ...state,
        checkData: {
            ...state.checkData,
            isTransferAgreement,
        },
    }),
});
