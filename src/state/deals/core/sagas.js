import { delay } from 'redux-saga/effects';

import { dealsApi, queueApi } from '../../../api';
import { callNodeApi } from '../../../api/core/apiCaller';
import {
    mapToArray,
} from './utils';
import { Deal } from './models';


export function* getDeal({ dealId }) {
    const deal = yield callNodeApi(
        dealsApi.getDeal, { id: dealId },
    );
    return new Deal(deal);
}

export function* getDeals() {
    const deals = yield callNodeApi(
        dealsApi.getDeals,
    );
    return deals;
}

export function* createDeal({ deal }) {
    const { queueId, localDealId } = yield callNodeApi(
        dealsApi.createDeal, { deal },
    );
    yield updateDealStatus({ dealId: localDealId, nextStatus: 'created' });
    yield delay(500);
    const { dealId, queueId: newQueueId } =
        yield callNodeApi(queueApi.getGlobalDealIdentifier, { id: queueId });
    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });

    return new Deal({ ...newDeal, queueId: newQueueId });
}

export function* waitForDealStatus({ dealId, status, delayTime = 500, repeatCount = 5 }) {
    let responseDeal;
    for (let i = 0; i < repeatCount; i++) {
        try {
            responseDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
            if (status === responseDeal.status)
                return new Deal(responseDeal);
        } catch (err) {
            if (i < 4 && !status === responseDeal.status)
                yield delay(delayTime);
        }
    }
    throw new Error('Status has not changed');
}

export function* updateDealStatus({ dealId, nextStatus }) {
    const response = yield callNodeApi(dealsApi.changeStatus, {
        id: dealId, status: nextStatus,
    });
    const { queueId } = response;

    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
    return new Deal({ ...newDeal, queueId });
}

export function* updateDealParameters({ dealId, parameters }) {
    const response = yield callNodeApi(dealsApi.updateParameters, {
        id: dealId, parameters: mapToArray(parameters),
    });
    const { queueId } = response;
    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
    return new Deal({ ...newDeal, queueId });
}

export function* updateDeal({ dealId, dealData }) {
    const mappedParameters = dealData.parameters && mapToArray(dealData.parameters);
    const updatedDeal = yield callNodeApi(dealsApi.updateDeal, {
        id: dealId,
        dealData: { ...dealData, parameters: mappedParameters },
    });
    return new Deal(updatedDeal);
}
