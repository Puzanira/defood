import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('admin', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    SET_ORDERS_DATA: 'SET_ORDERS_DATA',
    GET_ORDERS: 'GET_ORDERS',

    SET_CHECK_DATA: 'SET_CHECK_DATA',
    SET_IS_TRANSFERRED: 'SET_IS_TRANSFERRED',
    SET_IS_TRANSFER_AGREEMENT: 'SET_IS_TRANSFER_AGREEMENT',
    SET_IS_TRANSFERRED_DATA: 'SET_IS_TRANSFERRED_DATA', // sagas
    SET_IS_TRANSFER_AGREEMENT_DATA: 'SET_IS_TRANSFER_AGREEMENT_DATA', // sagas
    GET_CHECK_DATA: 'GET_CHECK_DATA', // sagas

    CLEAR_CHECK_STATUSES: 'CLEAR_CHECK_STATUSES',
    SET_STATUS_MARKER: 'SET_STATUS_MARKER',
    SET_ITEM_TO_ACTIVE_LIST: 'SET_ITEM_TO_ACTIVE_LIST',
    BLOCK_ALL_VALUES_OF_STATUSES: 'BLOCK_ALL_VALUES_OF_STATUSES',
    CREATE_COPIES_OF_LISTS: 'CREATE_COPIES_OF_LISTS',
    DELETE_COPIES_OF_LISTS: 'DELETE_COPIES_OF_LISTS',
    DELETE_IS_AVAILABLE_BY_INDEX: 'DELETE_IS_AVAILABLE_BY_INDEX',
    SET_MARKERED_POINT: 'SET_MARKERED_POINT', // sagas
    SET_IS_TRANSFERRED_ACTIVITY: 'SET_IS_TRANSFERRED_ACTIVITY', // sagas
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
    setIsTransferredData: createAction(types.SET_IS_TRANSFERRED_DATA),
    setIsTransferAgreementData: createAction(types.SET_IS_TRANSFER_AGREEMENT_DATA),

    clearCheckStatuses: createAction(types.CLEAR_CHECK_STATUSES),
    setStatusMarker: createAction(types.SET_STATUS_MARKER),
    setItemToActiveList: createAction(types.SET_ITEM_TO_ACTIVE_LIST),
    blockAllValuesOfStatuses: createAction(types.BLOCK_ALL_VALUES_OF_STATUSES),
    createCopiesOfLists: createAction(types.CREATE_COPIES_OF_LISTS),
    deleteCopiesOfLists: createAction(types.DELETE_COPIES_OF_LISTS),
    deleteIsAvailableByIndex: createAction(types.DELETE_IS_AVAILABLE_BY_INDEX),
    setMarkeredPoint: createAction(types.SET_MARKERED_POINT),
    setIsTransferredActivity: createAction(types.SET_IS_TRANSFERRED_ACTIVITY),
};
