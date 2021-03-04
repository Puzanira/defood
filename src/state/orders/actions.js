import { prefixTypes, createAction } from '../../core/state/utils';


const types = prefixTypes('orders', {
    CREATE_ORDER_DEAL: 'CREATE_ORDER_DEAL',
});

export { types as ordersActionTypes };

export const ordersActions = {
    createOrderDeal: createAction(types.CREATE_ORDER_DEAL),
};
