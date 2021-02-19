import { waitForBakingStatus } from './sagas';
import { updateDealStatus } from '../core/sagas';


export const statusMap = {
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
