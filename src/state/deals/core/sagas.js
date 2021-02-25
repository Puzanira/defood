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
    yield waitForSuccessQueueStatus({ queueId });
    const updatedDeal = yield updateDealStatus({ dealId: localDealId, nextStatus: 'payment' });

    return updatedDeal;
}

export function* waitForDealStatus({ dealId, status, delayTime = 60000, repeatCount = 5 }) {
    let responseDeal;
    for (let i = 0; i < repeatCount; i++) {
        try {
            responseDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
            if (status === responseDeal.status)
                return new Deal(responseDeal);

            if (i < 4 && !status === responseDeal.status)
                yield delay(delayTime);
        } catch (err) {
            if (i < 4 && !status === responseDeal.status)
                yield delay(delayTime);
        }
    }
    throw new Error('Status has not changed');
}

export function* waitForSuccessQueueStatus({ queueId, delayTime = 60000, repeatCount = 8 }) {
    let response;
    for (let i = 0; i < repeatCount; i++) {
        try {
            response = yield callNodeApi(queueApi.getQueueStatus, { id: queueId });
            if (i < 4 && response.status === 'InQueue')
                yield delay(delayTime);
            if (response.status === 'Success')
                return true;
            if (response.status === 'Error')
                throw new Error(`Error on operation ${queueId}: ${response.error}`);
        } catch (err) {
            if (response.status === 'Error')
                throw err;

            if (i < 4 && response.status === 'InQueue')
                yield delay(delayTime);
        }
    }
    throw new Error('Status InQueue has not changed');
}

export function* updateDealStatus({ dealId, nextStatus }) {
    const queueId = yield callNodeApi(dealsApi.changeStatus, {
        id: dealId, status: nextStatus,
    });
    yield waitForSuccessQueueStatus({ queueId });

    const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
    return new Deal(newDeal);
}

// export function* updateDealParameters({ dealId, parameters }) {
//     const response = yield callNodeApi(dealsApi.updateParameters, {
//         id: dealId, parameters: mapToArray(parameters),
//     });
//     const { queueId } = response;
//     const newDeal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
//     return new Deal({ ...newDeal, queueId });
// }

// export function* updateDeal({ dealId, dealData }) {
//     const mappedParameters = dealData.parameters && mapToArray(dealData.parameters);
//     const updatedDeal = yield callNodeApi(dealsApi.updateDeal, {
//         id: dealId,
//         dealData: { ...dealData, parameters: mappedParameters },
//     });
//     return new Deal(updatedDeal);
// }
