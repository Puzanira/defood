
export const dealTypes = {
    initialOrder: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
            type: 'Initial',
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
    transferOrder: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
            type: 'Transfer',
            initiator: String,
            queueId: String,
            price: Number,
            orderData: String,

            // delivery:
            deliverer: String,

            // transfer:
            isTransferred: Boolean,
            transferredTo: String,
            transferOrderId: String,
        },
    },
    deliveryOrder: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
            addressTo: String,
            addressFrom: String,
            clientContacts: String,
        },
    },
};

export const orderStatusMap = {
    created: {
        next: {
            success: order => 'accepting',
        },
    },
    accepting: {
        next: {
            success: order => 'payment',
            reject: order => 'closed',
        },
    },
    payment: {
        next: {
            success: order => 'processing',
        },
    },
    processing: {
        next: {
            success: order => 'deliveryAgreement',
            reject: order => 'transferringToPizza',
        },
    },
    transferringToPizza: {
        next: {
            success: order => 'deliveryAgreement',
            reject: order => 'processing',
        },
    },
    deliveryAgreement: {
        next: {
            success: order => 'baking',
        },
    },
    baking: {
        next: {
            success: order => 'transferredToDelivery',
        },
    },
    transferredToDelivery: {
        next: {
            success: order => 'closed',
        },
    },
    closed: { next: null },
};

export const deliveryStatusMap = {
    created: {
        next: {
            success: order => 'accepting',
        },
    },
    accepting: {
        next: {
            success: order => 'payment',
        },
    },
    payment: {
        next: {
            success: order => 'receiving',
        },
    },
    receiving: {
        next: {
            success: order => 'delivering',
        },
    },
    delivering: {
        next: {
            success: order => 'closed',
        },
    },
    closed: { next: null },
};
