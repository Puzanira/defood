export const BakerActionMap = {
    $Initiated: {
        transferAction: 'update',
        textMessage: 'Start processing',
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
        transferAction: 'update',
        textMessage: 'Close order',
    },
    Closed: { next: null },
};
