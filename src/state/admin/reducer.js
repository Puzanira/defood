import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';

import { checkStatuses, statuses } from '../../store/admin-mock-data';

// Разложила на более простые, причины изменения defaultState не обнаружила
const defaultState = {
    busy: false,
    orders: [],

    checkData: {
        data: {},
        isTransferred: false,
        isTransferAgreement: true,
    },
    valuesOfStatuses: { ...checkStatuses.valuesOfStatuses },
    activeStatusesList: {},
    copyStatusesList: {},
    copyActiveStatusesList: {},
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
        valuesOfStatuses: { ...defaultState.valuesOfStatuses }, // Тут происходит что-то нпонентное с изменением массива
        activeStatusesList: {},
        copyStatusesList: {},
        copyActiveStatusesList: {},
    }),
    [adminActionTypes.SET_STATUS_MARKER]: (state, id) => {
        const newStatuses = { ...state.valuesOfStatuses };

        Object.keys(newStatuses).forEach(elem => {
            if (newStatuses[elem].id === id)
            newStatuses[elem].isSelected = true;


            if (newStatuses[elem].id === id + 1)
            newStatuses[elem].isAvailable = true;
        });

        return { ...state, valuesOfStatuses: newStatuses };
    },
    [adminActionTypes.SET_ITEM_TO_ACTIVE_LIST]: (state, { id, value, time }) => ({
        ...state,
        activeStatusesList: {
            ...state.activeStatusesList,
            [id]: { time, value },
        },
    }),
    [adminActionTypes.BLOCK_ALL_VALUES_OF_STATUSES]: state => {
        console.log('block');
        console.log(defaultState.valuesOfStatuses);
        console.log(defaultState.activeStatusesList);

        return {
            ...state,
            valuesOfStatuses: { ...statuses.valuesOfStatuses },
            activeStatusesList: { ...defaultState.activeStatusesList },
        };
    },
    [adminActionTypes.CREATE_COPIES_OF_LISTS]: state => ({
        ...state,
        copyStatusesList: { ...state.valuesOfStatuses },
        copyActiveStatusesList: { ...state.activeStatusesList },
    }),
    [adminActionTypes.DELETE_COPIES_OF_LISTS]: state => ({
        ...state,
        valuesOfStatuses: { ...state.copyStatusesList },
        activeStatusesList: { ...state.copyActiveStatusesList },
        copyStatusesList: {},
        copyActiveStatusesList: {},
    }),
    [adminActionTypes.DELETE_IS_AVAILABLE_BY_INDEX]: (state, key) => {
        const newStatus = { ...state.valuesOfStatuses };
        newStatus[key].isAvailable = false;

        return { ...state, valuesOfStatuses: newStatus };
    },
});
