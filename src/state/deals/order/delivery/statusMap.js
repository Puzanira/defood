export const statusMap = {
    $Initiated: {
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


