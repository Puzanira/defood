import _ from 'lodash';
import { delay, put, takeEvery } from 'redux-saga/effects';

import { dealsApi, queueApi } from '../api';
import { callNodeApi } from '../../api/apiCaller';
import { dealsActions, dealsActionTypes } from './actions';
import { Deal } from './models';
import { defaultDelay, defaultRepeat, queue } from '../constants';
import { QueueOperationError, StatusNotChangedError } from './errors';


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
    yield waitForSuccessQueueStatus({ id: queueId });
    const updatedDeal = yield updateDealStatus({ $payload: { id: localDealId, nextStatus: 'payment' } });

    return updatedDeal;
}

export function* waitForNewDealStatus({
 $payload: {
      id,
      currentStatus,
      callback,
      delayTime = defaultDelay,
      repeatCount = defaultRepeat,
},
}) {
    let responseDeal;

    for (let i = 0; i < repeatCount; i++) {
        try {
            responseDeal = yield callNodeApi(dealsApi.getDeal, { id });
            if (currentStatus !== responseDeal.status) {
                if (callback)
                    callback(new Deal(responseDeal));
                return new Deal(responseDeal);
            }

            if (currentStatus === responseDeal.status)
                yield delay(delayTime);
        } catch (err) {
            if (currentStatus === responseDeal.status)
                yield delay(delayTime);
        }
    }
    throw new StatusNotChangedError(id);
}

export function* waitForSuccessQueueStatus({
       id,
       delayTime = defaultDelay,
       repeatCount = defaultRepeat,
}) {
    let response;
    for (let i = 0; i < repeatCount; i++) {
        try {
            response = yield callNodeApi(queueApi.getQueueStatus, { id });
            if (response.status === queue.successQueueStatus)
                return;

            if (_.includes(queue.progressQueueStatuses, response.status))
                yield delay(delayTime);

            if (response.status === queue.errorQueueStatus &&
                response.error !== 'Connection refused')
                throw new QueueOperationError(id);
        } catch (err) {
            if (response.status === queue.errorQueueStatus)
                throw err;

            if (_.includes(queue.progressQueueStatuses, response.status))
                yield delay(delayTime);
        }
    }
    throw new StatusNotChangedError(id);
}

export function* updateDealStatus({ $payload: { id, nextStatus } }) {
    const queueId = yield callNodeApi(dealsApi.changeStatus, {
        id, status: nextStatus,
    });
    yield waitForSuccessQueueStatus({ id: queueId });

    const newDeal = yield callNodeApi(dealsApi.getDeal, { id });
    return new Deal(newDeal);
}

/*
    All actions perform deals operations and should return an updated deal
    after success operation. Callbacks, if specified, should work with
    updatedDeal
    (new Deal(updatedDeal))
*/
const dealsActionMap = {
    wait: waitForNewDealStatus,
    update: updateDealStatus,
};

export function* callNextAction({
 $payload: {
    id,
    currentStatus,
    nextStatus,
    actionType,
    callback,
},
}) {
    yield put(dealsActions.setPendingDeal(id));
    const action = dealsActionMap[actionType];
    try {
        const response = yield action({ $payload: { id, currentStatus, nextStatus } });
        callback(response);
    } catch (e) {
        console.log(e);
    }
    yield put(dealsActions.removePendingDeal(id));
}

export const sagas = [
    takeEvery(dealsActionTypes.CALL_NEXT_ACTION, callNextAction),
    takeEvery(dealsActionTypes.WAIT_FOR_NEW_DEAL_STATUS, waitForNewDealStatus),
];
