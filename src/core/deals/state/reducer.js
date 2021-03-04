import _ from 'lodash';

import { lookupTableReducer } from '../../state/utils';
import { dealsActionTypes } from './actions';


const defaultState = {
    pendingDeals: {},
};

export const reducer = lookupTableReducer(defaultState, {
    [dealsActionTypes.SET_PENDING_DEAL]: (state, deal) => ({
        ...state,
        pendingDeals: {
            ...state.pendingDeals,
            [deal.id]: deal.status,
        },
    }),
    [dealsActionTypes.REMOVE_PENDING_DEAL]: (state, id) => ({
        ...state,
        pendingDeals: _.omit(state.pendingDeals, id),
    }),
});
