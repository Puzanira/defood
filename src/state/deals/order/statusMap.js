import {
    createDeliveryDeal,
    transferringDeal,
    waitForDeliveryStatus,
} from './sagas';
import { updateDealStatus } from '../core/sagas';


export const statusMap = {
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
