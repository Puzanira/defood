import {
    transferringDeal,
    updateDealStatus,
    createDeliveryDeal,
    waitForDeliveryStatus,
    waitForBakingStatus,
} from './kekkerDealTransitions';


export const dealTypes = {
    order: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
            addressTo: String,
            addressFrom: String,
            price: Number,
            orderData: String,
            clientContacts: String,

            // transfer:
            isTransferred: Boolean,
            transferredTo: String,
            transferOrderId: String,

            // delivery:
            deliverer: String,
            deliveryOrderId: String,

        },
    },
    deliveryOrder: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
            orderId: String,
            addressTo: String,
            addressFrom: String,
            clientContacts: String,
        },
    },
};

export const orderStatusMap = {
    created: {
        next: {
            success: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'accepting' }),
        },
    },
    accepting: {
        next: {
            success: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'payment' }),
            reject: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'closed' }),
        },
    },
    payment: {
        next: {
            success: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'processing' }),
        },
    },
    transferringToPizza: {
        next: {
            success: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'deliveryAgreement' }),
            reject: deal => transferringDeal({ deal }),
        },
    },
    deliveryAgreement: {
        next: {
            success: deal => createDeliveryDeal({ deal }),
        },
    },
    baking: {
        next: {
            success: deal => updateDealStatus({ dealId: deal.dealId, nextStatus: 'transferredToDelivery' }),
        },
    },
    transferredToDelivery: {
        next: {
            success: deal => waitForDeliveryStatus({ deal }),
        },
    },
    closed: { next: null },
};

export const deliveryStatusMap = {
    created: {
        next: {
            success: deal => updateDealStatus({ deal, nextStatus: 'accepting' }),
        },
    },
    accepting: {
        next: {
            success: deal => updateDealStatus({ deal, nextStatus: 'payment' }),
        },
    },
    payment: {
        next: {
            success: deal => updateDealStatus({ deal, nextStatus: 'receiving' }),
        },
    },
    receiving: {
        next: {
            success: deal => waitForBakingStatus({ deal }),
        },
    },
    delivering: {
        next: {
            success: deal => updateDealStatus({ deal, nextStatus: 'closed' }),
        },
    },
    closed: { next: null },
};

export const callNext = ({ order, actionType }) =>
    actionType === 'closed'
        ? order
        : orderStatusMap[order.status].next[actionType](order);
