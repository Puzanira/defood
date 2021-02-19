import { delay } from 'redux-saga/effects';

import { dealsApi, queueApi } from '../../../api';
import { callNodeApi } from '../../../api/core/apiCaller';
import {
    withMappedParametersToObject,
    withMappedParametersToArray,
    mapToArray,
} from './utils';


export function* createDeal({ deal }) {
    const { queueId } = yield callNodeApi(
        dealsApi.createDeal, { deal: withMappedParametersToArray({ deal }) },
    );
    const { dealId, queueId: newQueueId } =
        yield callNodeApi(queueApi.getGlobalDealIdentifier, { id: queueId });
    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });

    return withMappedParametersToObject({ ...newDeal, queueId: newQueueId });
}

export function* waitForDealStatus({ dealId, statuses }) {
    let responseDeal;
    for (let i = 0; i < 5; i++) {
        try {
            responseDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
            if (statuses.find(responseDeal.status))
                return withMappedParametersToObject(responseDeal);
        } catch (err) {
            if (i < 4 && !statuses.find(responseDeal.status))
                yield delay(500);
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
    return withMappedParametersToObject({ ...newDeal, queueId });
}

export function* updateDealParameters({ dealId, parameters }) {
    const response = yield callNodeApi(dealsApi.updateParameters, {
        id: dealId, parameters: mapToArray(parameters),
    });
    const { queueId } = response;
    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
    return withMappedParametersToObject({ ...newDeal, queueId });
}

export function* updateDeal({ dealId, dealData }) {
    const mappedParameters = dealData.parameters && mapToArray(dealData.parameters);
    const updatedDeal = yield callNodeApi(dealsApi.updateDeal, {
        id: dealId,
        dealData: { ...dealData, parameters: mappedParameters },
    });
    return withMappedParametersToObject(updatedDeal);
}
