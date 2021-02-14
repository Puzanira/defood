import { lookupTableReducer } from '../utils';
import { clientActionTypes } from './actions';


const defaultState = {
    busy: false,
};

export const reducer = lookupTableReducer(defaultState, {
    [clientActionTypes.CLEAR_ALL]: state => ({
        ...defaultState,
        busy: state.busy,
    }),
    [clientActionTypes.SET_STATUS]: (state, status) => ({
        ...state,
        ...status,
    }),
});
