import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';

import { checkStatuses, statuses } from '../../store/admin-mock-data';

// Почему меняется defaultState???
const defaultState = {
    busy: false,
    orders: [],

    checkData: {
        data: {},
        isTransferred: false,
        isTransferAgreement: true,
    },
    checkStatuses: { ...checkStatuses },
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
    [adminActionTypes.CLEAR_CHECK_STATUSES]: state => ({
        ...state,
        checkStatuses: { ...defaultState.checkStatuses }, // Тут происходит что-то нпонентное с изменением массива
    }),
    [adminActionTypes.SET_STATUS_MARKER]: (state, id) => {
        const newStatuses = { ...state.checkStatuses.valuesOfStatuses };

        Object.keys(newStatuses).forEach(elem => {
            if (newStatuses[elem].id === id)
            newStatuses[elem].isSelected = true;


            if (newStatuses[elem].id === id + 1)
            newStatuses[elem].isAvailable = true;
        });

        return { ...state, checkStatuses: { ...state.checkStatuses, valuesOfStatuses: newStatuses } };
    },
    [adminActionTypes.SET_ITEM_TO_ACTIVE_LIST]: (state, { id, value, time }) => ({
        ...state,
        checkStatuses: {
            ...state.checkStatuses,
            activeStatusesList: {
                ...state.checkStatuses.activeStatusesList,
                [id]: { time, value },
            },
        },
    }),
    [adminActionTypes.BLOCK_ALL_VALUES_OF_STATUSES]: state => {
        console.log('block');
        console.log(defaultState.checkStatuses.valuesOfStatuses);
        console.log(defaultState.checkStatuses.activeStatusesList);

        return {
            ...state,
            checkStatuses: {
                ...state.checkStatuses,
                valuesOfStatuses: { ...statuses.valuesOfStatuses },
                activeStatusesList: { ...defaultState.checkStatuses.activeStatusesList },
            },
        };
    },
    [adminActionTypes.CREATE_COPIES_OF_LISTS]: state => ({
        ...state,
        checkStatuses: {
            ...state.checkStatuses,
            copyStatusesList: state.checkStatuses.valuesOfStatuses,
            copyActiveStatusesList: state.checkStatuses.activeStatusesList,
        },
    }),
    [adminActionTypes.DELETE_COPIES_OF_LISTS]: state => ({
        ...state,
        checkStatuses: {
            ...state.checkStatuses,
            valuesOfStatuses: state.checkStatuses.copyStatusesList,
            activeStatusesList: state.checkStatuses.copyActiveStatusesList,
            copyStatusesList: {},
            copyActiveStatusesList: {},
        },
    }),
    [adminActionTypes.DELETE_IS_AVAILABLE_BY_INDEX]: (state, key) => {
        const newStatus = { ...state.checkStatuses.valuesOfStatuses };
        newStatus[key].isAvailable = false;

        return { ...state, checkStatuses: { ...state.checkStatuses, valuesOfStatuses: newStatus } };
    },
});
