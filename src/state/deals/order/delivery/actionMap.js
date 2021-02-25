export const actionMap = {
    $Initiated: {
        transferAction: 'wait',
        textMessage: 'Wait for order to be baked',
    },
    baked: {
        transferAction: 'update',
        textMessage: 'Confirm delivery transfer',
    },
    delivering: {
        transferAction: 'update',
        textMessage: 'Confirm delivery',
    },
    delivered: {
        transferAction: 'wait',
        textMessage: 'Wait for order to be closed',
    },
    Closed: {
        transferAction: null,
        textMessage: 'Заказ закрыт',
    },
};
