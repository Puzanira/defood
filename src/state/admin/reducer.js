import { lookupTableReducer } from '../utils';
import { adminActionTypes } from './actions';


const defaultState = {
    busy: false,
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
});
