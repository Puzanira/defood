import _ from 'lodash';

import { NODE_CONFIG } from '../../../config';
import { orders } from './index';


export function getOrderTransitions(order) {
    if (!order || !order.parties || !order.parameters)
        return null;

    const { role: currentRole } =
        _.find(order.parties, ['key', NODE_CONFIG.node.toUpperCase()]);

    let type;
    if (Array.isArray(order.parameters))
        type = _.find(order.parameters, ['key', 'type']).value;
    else
        type = order.parameters.type;

    // { statusMap, actionMap, statusMessageMap, actionMessageMap, getParameters }
    return orders[type].transitions[currentRole];
}
