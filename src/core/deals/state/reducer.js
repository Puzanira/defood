import { lookupTableReducer } from '../../state/utils';
import { dealsActionTypes } from './actions';
import _ from 'lodash';


const defaultState = {
    pendingDeals: [],
};

export const reducer = lookupTableReducer(defaultState, {
    [dealsActionTypes.SET_PENDING_DEAL]: (state, id) => ({
        ...state,
        pendingDeals: [
            ...state.pendingDeals,
            id,
        ],
    }),
    [dealsActionTypes.REMOVE_PENDING_DEAL]: (state, id) => ({
        ...state,
        pendingDeals: _.without(state.pendingDeals, id),
    }),
});
