
export const dealTypes = {
    initialOrder: {
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
    transferOrder: {
        localDealId: String,
        dealId: String,
        queueId: String,
        parameters: {
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
            onSuccess: 'accepting',
        },
    },
    accepting: {
        next: {
            onSuccess: 'payment',
            onReject: 'closed',
        },
    },
    payment: {
        next: {
            onSuccess: 'processing',
        },
    },
    processing: {
        next: {
            onSuccess: 'deliveryAgreement',
            onReject: 'transferringToPizza',
        },
    },
    transferringToPizza: {
        next: {
            onSuccess: 'deliveryAgreement',
            onReject: 'processing',
        },
    },
    deliveryAgreement: {
        next: {
            onSuccess: 'baking',
        },
    },
    baking: {
        next: {
            onSuccess: 'transferredToDelivery',
        },
    },
    transferredToDelivery: { next: 'closed' },
    closed: { next: null },
};

export const deliveryStatusMap = {
    created: {
        next: {
            onSuccess: 'accepting',
        },
    },
    accepting: {
        next: {
            onSuccess: 'payment',
        },
    },
    payment: {
        next: {
            onSuccess: 'receiving',
        },
    },
    receiving: {
        next: {
            onSuccess: 'delivering',
        },
    },
    delivering: {
        next: {
            onSuccess: 'closed',
        },
    },
    closed: { next: null },
};
