import { config } from '../../../config';
import {
    updateDealStatus,
    waitForDealStatus,
    createDeal,
    updateDeal,
} from '../core/sagas';


const initiator = process.env.REACT_APP_NODE;

export function* transferringDeal({ deal }) {
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
            statuses: ['deliveryAgreement', 'closed'],
        });

        // responseTransferDeal should have addressFrom field
        if (responseTransferDeal.status === 'deliveryAgreement') {
            const updatedDeal = yield updateDeal({
                    id: deal.dealId,
                    dealData: {
                        status: 'deliveryAgreement',
                        parameters: {
                            isTransferred: true,
                            transferredTo: transferNode,
                            transferOrderId: responseTransferDeal.dealId,
                        },
                    },
                });
            return updatedDeal;
        }

        console.log('Transfer Node refused to bake pizza, baking by yourself');
    } catch (e) {
        console.log('Transfer Node not answering, baking by yourself');
    }

    const updatedDeal = yield updateDeal({
        id: deal.dealId,
        dealData: {
            status: 'deliveryAgreement',
            parameters: {
                addressFrom: config.addresses.PIZZA1,
            },
        },
    });
    return updatedDeal;
}


export function* createDeliveryDeal({ deal }) {
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
    const updatedDeal = yield updateDeal({
        dealId: deal.dealId,
        dealData: {
            status: 'baking',
            parameters: {
                deliverer: deliveryNode,
                deliveryOrderId: deliveryDeal.dealId,
            },
        },
    });
    return updatedDeal;
}

export function* waitForDeliveryStatus({ deal }) {
    const { deliveryOrderId } = deal;
    try {
        yield waitForDealStatus({
            dealId: deliveryOrderId,
            statuses: ['closed'],
        });
        console.log('Successful delivery');
    } catch (e) {
        console.log('Delivery Node not answering');
    }
    const updatedDeal = updateDealStatus({ dealId: deal.dealId, nextStatus: 'closed' });
    return updatedDeal;
}
