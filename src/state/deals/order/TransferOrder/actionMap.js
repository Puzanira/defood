export const BakerActionMap = {
    created: {
        transferAction: 'wait',
        textMessage: 'Wait for payment initiation',
    },
    payment: {
        transferAction: 'update',
        textMessage: 'Confirm payment',
    },
    baking: {
        transferAction: 'update',
        textMessage: 'Confirm baked',
    },
    baked: {
        transferAction: 'wait',
        textMessage: 'Waiting for delivery transfer',
    },
    delivering: {
        transferAction: 'wait',
        textMessage: 'Waiting for delivery',
    },
    delivered: {
        transferAction: 'wait',
        textMessage: 'Wait for order closure',
    },
    Closed: { next: null },
};


export const InitiatorActionMap = {
    $Initiated: {
        transferAction: 'update',
        textMessage: 'Start payment process',
    },
    payment: {
        transferAction: 'wait',
        textMessage: 'Waiting for payment confirmation',
    },
    baking: {
        transferAction: 'wait',
        textMessage: 'Waiting for baking',
    },
    baked: {
        transferAction: 'wait',
        textMessage: 'Waiting for delivery transfer',
    },
    delivering: {
        transferAction: 'wait',
        textMessage: 'Waiting for delivery',
    },
    delivered: {
        transferAction: 'update',
        textMessage: 'Close deal',
    },
    Closed: { next: null },
};
