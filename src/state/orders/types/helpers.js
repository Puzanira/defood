import _ from 'lodash';

import { NODE_CONFIG } from '../../../config';
import { orders } from './index';


export function getOrderTransitions(order) {
    if (!order || !order.parties)
        return null;

    const { role: currentRole } =
        _.find(order.parties, ['key', NODE_CONFIG.node.toUpperCase()]);
    const { type } = order.parameters;

    // { statusMap, actionMap, statusMessageMap, actionMessageMap, getParameters }
    return orders[type].transitions[currentRole];
}
