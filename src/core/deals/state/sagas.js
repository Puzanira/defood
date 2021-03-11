import fp from 'lodash/fp';
import { delay, put, takeEvery, all } from 'redux-saga/effects';

import { dealsApi, queueApi } from '../api';
import { callNodeApi } from '../../api/apiCaller';
import { dealsActions, dealsActionTypes } from './actions';
import { Deal } from './models';
import { defaultDelay, defaultRepeat, queue } from '../constants';
import {
    QueueOperationError,
    QueueOperationNotFoundError,
    StatusNotChangedError,
    ConnectionRefusedError,
} from './errors';


export function* getDeal({ dealId }) {
    const deal = yield callNodeApi(dealsApi.getDeal, { id: dealId });
    return new Deal(deal);
}

export function* getDeals() {
    return yield callNodeApi(dealsApi.getDeals);
}

function* removeOperation(id) {
    yield callNodeApi(queueApi.remove, { id });
}

function* removeOperations({ operations }) {
    yield all(fp.map(removeOperation, operations));
}

function* waitForOperation(id) {
    yield waitForSuccessQueueStatus({ id });
}

function* waitForAllOperations({ operations }) {
    yield all(fp.map(waitForOperation, operations));
}

function* processDealIncompleteQueue({ id }) {
    const { data } = yield callNodeApi(
        queueApi.getIncomplete, { dealId: id },
    );

    const operations = fp.pipe(
        fp.groupBy('status'),
        fp.toPairs,
        fp.map(([key, operations]) => [
            key, fp.map(item => item.queueId)(operations),
        ]),
        fp.fromPairs,
    )(data);

    if (operations.Error && operations.Error.length > 0) {
        if (operations.InQueue)
            yield removeOperations({ operations: operations.InQueue });
        yield removeOperations({ operations: operations.Error });
    } else {
        if (operations.InQueue)
            yield waitForAllOperations({ operations: operations.InQueue });
        if (operations.InProgress)
            yield waitForAllOperations({ operations: operations.InProgress });
    }
}

function* isSuccessQueueStatus({ id }) {
    const response = yield callNodeApi(queueApi.getQueueStatus, { id });
    if (response.status === queue.successQueueStatus)
        return true;

    // Platform errors come with 200 status
    if (response.status === queue.errorQueueStatus) {
        if (response.error === queue.errorMessages.connectionRefusedError)
            throw new ConnectionRefusedError(id);

        throw new QueueOperationError(id);
    }
    return false;
}

export function* waitForSuccessQueueStatus({
   id,
   delayTime = defaultDelay,
   repeatCount = defaultRepeat,
}) {
    for (let i = 0; i < repeatCount; i++) {
        try {
            const isSuccess = yield isSuccessQueueStatus({ id });
            if (isSuccess)
                return;
            yield delay(delayTime);
        } catch (err) {
            if (err.error === queue.errorMessages.itemNotFoundError)
                throw new QueueOperationNotFoundError(id);

            if (err instanceof QueueOperationError)
                throw err;

            if (err instanceof ConnectionRefusedError)
                yield delay(delayTime);
        }
    }
    throw new StatusNotChangedError(id);
}

export function* createDeal({ deal }) {
    const { queueId, localDealId } = yield callNodeApi(
        dealsApi.createDeal, { deal },
    );
    yield waitForSuccessQueueStatus({ id: queueId });
    yield updateDealStatus({ $payload: { id: localDealId, currentStatus: 'NEW', nextStatus: 'payment' } });
    return yield getDeal({ dealId: localDealId });
}

export function* waitForNewDealStatus({
 $payload: {
    id,
    currentStatus,
    delayTime = defaultDelay,
    repeatCount = defaultRepeat,
    callback,
},
}) {
    for (let i = 0; i < repeatCount; i++) {
        try {
            const responseDeal = yield getDeal({ dealId: id });
            if (currentStatus !== responseDeal.status) {
                if (callback)
                    callback(responseDeal);
                return responseDeal;
            }

            if (currentStatus === responseDeal.status)
                yield delay(delayTime);
        } catch (err) {
            yield delay(delayTime);
        }
    }
    throw new StatusNotChangedError(id);
}

export function* updateDealStatus({ $payload: { id, currentStatus, nextStatus } }) {
    yield processDealIncompleteQueue({ id });
    const deal = yield getDeal({ dealId: id });
    if (deal.status === currentStatus) {
        const queueId = yield callNodeApi(dealsApi.changeStatus, {
            id, status: nextStatus,
        });
        yield waitForSuccessQueueStatus({ id: queueId });
    }
    return yield getDeal({ dealId: id });
}

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
    yield put(dealsActions.setPendingDeal({ id, status: currentStatus }));

    try {
        const action = dealsActionMap[actionType];
        const updatedDeal = yield action({ $payload: { id, currentStatus, nextStatus } });
        callback(updatedDeal);
    } catch (err) {
        if (err instanceof StatusNotChangedError)
            console.log(err.message);

        if (err instanceof QueueOperationNotFoundError ||
            err instanceof QueueOperationError) {
            yield processDealIncompleteQueue({ id });
            const deal = yield getDeal({ dealId: id });
            callback(deal);
        }
    }

    yield put(dealsActions.removePendingDeal(id));
}

function* removePendingDealId({ $payload: { id } }) {
    yield put(dealsActions.removePendingDeal(id));
}

export const sagas = [
    takeEvery(dealsActionTypes.REMOVE_PENDING_DEAL_ID, removePendingDealId),
    takeEvery(dealsActionTypes.CALL_NEXT_ACTION, callNextAction),
    takeEvery(dealsActionTypes.WAIT_FOR_NEW_DEAL_STATUS, waitForNewDealStatus),
];
