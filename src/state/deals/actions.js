import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('deals', {
    CREATE_ORDER_DEAL: 'CREATE_ORDER_DEAL',
});

export { types as dealsActionTypes };

export const dealsActions = {
    createOrderDeal: createAction(types.CREATE_ORDER_DEAL),
};
