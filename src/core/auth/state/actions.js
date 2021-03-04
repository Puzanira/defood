import { prefixTypes, createAction } from '../../state/utils';


const types = prefixTypes('auth', {
    SET_STATUS: 'SET_STATUS',
    AUTHORIZE: 'AUTHORIZE',
});

export { types as authActionTypes };

export const authActions = {
    setStatus: createAction(types.SET_STATUS),
    authorize: createAction(types.AUTHORIZE),
};
