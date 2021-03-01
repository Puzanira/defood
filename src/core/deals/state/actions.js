import { prefixTypes, createAction } from '../../state/utils';


const types = prefixTypes('deals', {
    SET_PENDING_DEAL: 'SET_PENDING_DEAL',
    REMOVE_PENDING_DEAL: 'REMOVE_PENDING_DEAL',

    CALL_NEXT_ACTION: 'CALL_NEXT_ACTION',
    WAIT_FOR_NEW_DEAL_STATUS: 'WAIT_FOR_NEW_DEAL_STATUS',
});

export { types as dealsActionTypes };

export const dealsActions = {
    setPendingDeal: createAction(types.SET_PENDING_DEAL),
    removePendingDeal: createAction(types.REMOVE_PENDING_DEAL),

    callNextAction: createAction(types.CALL_NEXT_ACTION),
    waitForNewDealStatus: createAction(types.WAIT_FOR_NEW_DEAL_STATUS),
};
