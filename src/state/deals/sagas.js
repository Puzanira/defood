import _ from 'lodash';
import { put, takeEvery } from 'redux-saga/effects';

import { dealsActionTypes } from './actions';
import { createDeal, waitForDealStatus, updateDealStatus } from './core/sagas';
import { config, NODE, NODE_CONFIG } from '../../config';
import { clientActions } from '../client/actions';
import { dealModels } from './order';
import { getOrderTransitions } from './helpers';


export function* callNext({ deal }) {
    const { status: currentStatus } = deal;
    const { statusMap, actionMap } = getOrderTransitions(deal);
    const { next: nextStatus } = statusMap[currentStatus];
    const { transferAction } = actionMap[currentStatus];

    const updatedDeal = transferAction === 'wait'
        ? yield waitForDealStatus({ dealId: deal.dealId, status: nextStatus })
        : yield updateDealStatus({ dealId: deal.dealId, nextStatus });

    return [updatedDeal, actionMap[nextStatus]];
}

function* createOrderDeal({ $payload: { parameters } }) {
    const baker = NODE === 'PIZZA1' ? 'PIZZA2' : 'PIZZA1';

    const initiatorNode = NODE_CONFIG.node.toUpperCase();
    const delivererNode = config.parties.DELIVERY.node.toUpperCase();
    const bakerNode = config.parties[baker].node.toUpperCase();

    const { InitialOrderDeal, TransferOrderDeal } = dealModels;

    const [initialOrderParameters, transferOrderParameters] =
        _.partition(parameters.orderData, ['baker', NODE]);

    yield put(clientActions.setIsOrderCreated('inProcess'));

    if (initialOrderParameters.length > 0) {
        const initialDealData = new InitialOrderDeal({
            baker: initiatorNode,
            deliverer: delivererNode,
            parameters: {
                ...parameters,
                addressFrom: NODE_CONFIG.address,
                orderData: initialOrderParameters,
            },
        });

        const initialDeal = yield createDeal({ deal: initialDealData.toJSON() });
        yield put(clientActions.setOrder({
            id: initialDeal.dealId,
            data: initialOrderParameters,
            localDealId: initialDeal.localDealId,
        }));
    }

    if (transferOrderParameters.length > 0) {
        const transferDealData = new TransferOrderDeal({
            initiator: initiatorNode,
            baker: bakerNode,
            deliverer: delivererNode,
            parameters: {
                ...parameters,
                baker: config.parties[baker].name,
                addressFrom: config.parties[baker].address,
                orderData: transferOrderParameters,
            },
        });

        const transferDeal = yield createDeal({ deal: transferDealData.toJSON() });
        yield put(clientActions.setOrder({
            id: transferDeal.dealId,
            data: transferOrderParameters,
            localDealId: transferDeal.localDealId,
        }));
    }

    yield put(clientActions.setIsOrderCreated('ready'));
}


export const sagas = [
    takeEvery(dealsActionTypes.CREATE_ORDER_DEAL, createOrderDeal),
];
