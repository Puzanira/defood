export const statusMap = {
    created: {
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


