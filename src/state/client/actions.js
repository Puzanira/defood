import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('client', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',
    /* all your actions here */
});

export { types as clientActionTypes };

export const clientActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),
};
