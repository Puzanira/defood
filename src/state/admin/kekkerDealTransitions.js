import { put, delay } from 'redux-saga/effects';

import { callApi } from '../../api/core/apiCaller';
import { dealsApi, queueApi } from '../../api';
import { config } from '../../config';
import { plainify } from '../../utils';


export function callPizza1Api(apiCall, callArgs) {
    return callApi(apiCall, config.nodes.PIZZA1, callArgs);
}

function mapParametersToArray(parameters) {
    return plainify(parameters);
}

function mapParametersToObject(parameters) {
    return parameters.reduce((acc, cur, i) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {});
}

function withMappedParameters({ deal }) {
    return { ...deal, parameters: mapParametersToObject(deal.parameters) };
}

function withMappedParametersToArray({ deal }) {
    return { ...deal, parameters: mapParametersToArray(deal.parameters) };
}

export function* createDeal({ deal }) {
    const { queueId } = yield callPizza1Api(
        dealsApi.createDeal, { deal: withMappedParametersToArray({ deal }) },
    );
    const { dealId, queueId: newQueueId } =
        yield callPizza1Api(queueApi.getGlobalDealIdentifier, { id: queueId });
    const newDeal = yield callPizza1Api(dealsApi.getDeal, { id: dealId });

    return withMappedParameters({ ...newDeal, queueId: newQueueId });
}

function* waitForDealStatus({ dealId, statuses, node = config.nodes.PIZZA1 }) {
    let responseDeal;
    for (let i = 0; i < 5; i++) {
        try {
            responseDeal = yield callApi(dealsApi.getDeal, node, { id: dealId });
            if (statuses.find(responseDeal.status))
                return withMappedParameters(responseDeal);
        } catch (err) {
            if (i < 4 && !statuses.find(responseDeal.status))
                yield delay(500);
        }
    }
    throw new Error('Status has not changed');
}

export function* updateDealStatus({ dealId, nextStatus }) {
    const response = yield callPizza1Api(dealsApi.changeStatus, {
        id: dealId, status: nextStatus,
    });
    const { queueId } = response;

    const newDeal = yield callPizza1Api(dealsApi.getDeal, { id: dealId });
    return withMappedParameters({ ...newDeal, queueId });
}

export function* updateDealParameters({ dealId, parameters }) {
    const response = yield callPizza1Api(dealsApi.updateParameters, {
        id: dealId, parameters: mapParametersToArray(parameters),
    });
    const { queueId } = response;
    const newDeal = yield callPizza1Api(dealsApi.getDeal, { id: dealId });
    return withMappedParameters({ ...newDeal, queueId });
}

export function* transferringDeal({ deal }) {
    const initiator = config.nodes.PIZZA1.toUpperCase();
    const transferNode = config.nodes.PIZZA2.toUpperCase();

    const { price, orderData, clientContacts } = deal.parameters;
    const parameters = {
        price,
        orderData,
        initiator,
        clientContacts,
        type: 'Transfer',
    };

    const transferDealObject = {
        kind: 'FirstDeal',
        status: 'created',
        parties: [
        {
            key: initiator,
            role: 'Sender',
        },
        {
            key: transferNode,
            role: 'Receiver',
        },
        ],
        parameters,
    };

    const transferDeal = yield createDeal({ deal: transferDealObject });

    try {
        const responseTransferDeal = yield waitForDealStatus({
            dealId: transferDeal.dealId,
            node: transferNode,
            statuses: ['deliveryAgreement', 'closed'],
        });

        // responseTransferDeal should have addressFrom field
        if (responseTransferDeal.status === 'deliveryAgreement') {
            const updatedDeal = yield callPizza1Api(dealsApi.updateDeal,
                {
                    id: deal.dealId,
                    dealData: {
                        status: 'deliveryAgreement',
                        parameters: mapParametersToArray({
                            isTransferred: true,
                            transferredTo: transferNode,
                            transferOrderId: responseTransferDeal.dealId,
                        }),
                    },
                });
            return withMappedParameters(updatedDeal);
        }

        console.log('Transfer Node refused to bake pizza, baking by yourself');
        const updatedDeal = yield yield callPizza1Api(dealsApi.updateDeal, {
            id: deal.dealId,
            dealData: {
                status: 'deliveryAgreement',
                parameters: mapParametersToArray({
                    addressFrom: config.addresses.PIZZA1,
                }),
            },
        });
        return withMappedParameters(updatedDeal);
    } catch (e) {
        console.log('Transfer Node not answering, baking by yourself');
        const updatedDeal = yield yield callPizza1Api(dealsApi.updateDeal, {
            id: deal.dealId,
            dealData: {
                status: 'deliveryAgreement',
                parameters: mapParametersToArray({
                    addressFrom: config.addresses.PIZZA1,
                }),
            },
        });
        return withMappedParameters(updatedDeal);
    }
}

export function* createDeliveryDeal({ deal }) {
    const initiator = config.nodes.PIZZA1.toUpperCase();
    const deliveryNode = config.nodes.DELIVERY.toUpperCase();

    const { addressTo, addressFrom, clientContacts } = deal.parameters;
    const parameters = {
        addressFrom,
        addressTo,
        clientContacts,
        orderId: deal.dealId,
    };

    const deliveryDealObject = {
        kind: 'FirstDeal',
        status: 'created',
        parties: [
            {
                key: initiator,
                role: 'Sender',
            },
            {
                key: deliveryNode,
                role: 'Receiver',
            },
        ],
        parameters,
    };

    const deliveryDeal = yield createDeal({ deal: deliveryDealObject });
    const updatedDeal = yield yield callPizza1Api(dealsApi.updateDeal, {
        id: deal.dealId,
        dealData: {
            status: 'baking',
            parameters: mapParametersToArray({
                deliverer: deliveryNode,
                deliveryOrderId: deliveryDeal.dealId,
            }),
        },
    });
    return withMappedParameters(updatedDeal);
}

export function* waitForDeliveryStatus({ deal }) {
    const { deliveryOrderId } = deal;
    try {
        yield waitForDealStatus({
            dealId: deliveryOrderId,
            node: config.nodes.DELIVERY,
            statuses: ['closed'],
        });
        console.log('Successful delivery');
    } catch (e) {
        console.log('Delivery Node not answering');
    }
    const updatedDeal = updateDealStatus({ dealId: deal.dealId, nextStatus: 'closed' });
    return withMappedParameters(updatedDeal);
}

export function* waitForBakingStatus({ deal }) {
    const { orderId } = deal;
    try {
        yield waitForDealStatus({
            dealId: orderId,
            node: config.nodes.PIZZA1,
            statuses: ['transferredToDelivery'],
        });
        console.log('Successful delivery receiving');
    } catch (e) {
        console.log('Baker Node not answering');
    }
    const updatedDeal = updateDealStatus({ dealId: deal.dealId, nextStatus: 'delivering' });
    return withMappedParameters(updatedDeal);
}
