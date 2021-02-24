import _ from 'lodash';

import { NODE_CONFIG } from '../../config';
import { orders } from './order';


export function getOrderTransitions(deal) {
    const { role: currentRole } = _.find(deal.parties, ['key', NODE_CONFIG.node]);
    const { type } = deal.parameters;

    console.log(orders[type], currentRole, type, orders[type].parties[currentRole]);

    return orders[type].parties[currentRole];
}

export function getCurrentAction(deal) {
    const { status: currentStatus } = deal;
    const { actionMap } = getOrderTransitions(deal);

    return actionMap[currentStatus];
}
