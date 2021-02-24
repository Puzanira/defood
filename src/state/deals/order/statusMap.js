export const statusMap = {
    $Initiated: {
        next: 'payment',
    },
    payment: {
        next: 'baking',
    },
    baking: {
        next: 'baked',
    },
    baked: {
        next: 'delivering',
    },
    delivering: {
        next: 'delivered',
    },
    delivered: {
        next: 'Closed',
    },
    Closed: { next: null },
};

