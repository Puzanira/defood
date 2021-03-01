export const statusMap = {
    NEW: 'payment',
    payment: 'baking',
    baking: 'baked',
    baked: 'delivering',
    delivering: 'delivered',
    delivered: 'Closed',
};

export const statusMessageMap = {
    payment: 'Готовится',
    baking: 'Готовится',
    baked: 'Готов к доставке',
    delivering: 'Доставляется',
    delivered: 'Доставлен',
};


