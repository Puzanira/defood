import _ from 'lodash';
import { put, takeEvery, all } from 'redux-saga/effects';

import { ordersActionTypes } from './actions';
import { createDeal } from '../../core/deals/state/sagas';
import { config, NODE, NODE_CONFIG } from '../../config';
import { clientActions } from '../client/actions';
import { dealModels } from './types';


const { InitialOrderDeal, TransferOrderDeal } = dealModels;

function* createInitialDeal({ baker, deliverer, parameters }) {
    const initialDealData = new InitialOrderDeal({
        baker,
        deliverer,
        parameters,
    });

    const initialDeal = yield createDeal({ deal: initialDealData.toJSON() });
    yield put(clientActions.setOrder({
        id: initialDeal.dealId,
        data: parameters,
        localDealId: initialDeal.localDealId,
    }));
}

function* createTransferDeal({ initiator, baker, deliverer, parameters }) {
    const transferDealData = new TransferOrderDeal({
        initiator,
        baker,
        deliverer,
        parameters,
    });

    const transferDeal = yield createDeal({ deal: transferDealData.toJSON() });
    yield put(clientActions.setOrder({
        id: transferDeal.dealId,
        data: parameters,
        localDealId: transferDeal.localDealId,
    }));
}


function* createOrderDeal({ $payload: { parameters } }) {
    const baker = NODE === 'PIZZA1' ? 'PIZZA2' : 'PIZZA1';

    const initiatorNode = NODE_CONFIG.node.toUpperCase();
    const delivererNode = config.parties.DELIVERY.node.toUpperCase();
    const bakerNode = config.parties[baker].node.toUpperCase();

    const [initialOrderParameters, transferOrderParameters] =
        _.partition(parameters.orderData, ['baker', NODE]);

    const initialDealData = {
        baker: initiatorNode,
        deliverer: delivererNode,
        parameters: {
            ...parameters,
            baker: config.parties[NODE].name,
            addressFrom: NODE_CONFIG.address,
            orderData: initialOrderParameters,
        },
    };

    const transferDealData = {
        initiator: initiatorNode,
        baker: bakerNode,
        deliverer: delivererNode,
        parameters: {
            ...parameters,
            initiator: config.parties[NODE].name,
            baker: config.parties[baker].name,
            addressFrom: config.parties[baker].address,
            orderData: transferOrderParameters,
        },
    };

    yield put(clientActions.setOrderInProgress(true));

    if (initialOrderParameters.length > 0 && transferOrderParameters.length > 0) {
        yield all([
            createInitialDeal(initialDealData),
            createTransferDeal(transferDealData),
        ]);
    } else if (initialOrderParameters.length > 0)
        yield createInitialDeal(initialDealData);
    else if (transferOrderParameters.length > 0)
        yield createTransferDeal(transferDealData);

    yield put(clientActions.setOrderInProgress(false));
}


export const sagas = [
    takeEvery(ordersActionTypes.CREATE_ORDER_DEAL, createOrderDeal),
];
