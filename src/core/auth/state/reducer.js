import { lookupTableReducer } from '../../state/utils';
import { authActionTypes } from './actions';


const defaultState = {
    authorized: false,
};

export const reducer = lookupTableReducer(defaultState, {
    [authActionTypes.SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
});
