export const statusMap = {
    NEW: 'payment',
    payment: 'baking',
    baking: 'baked',
    baked: 'delivering',
    delivering: 'delivered',
    delivered: 'Closed',
};

export const statusMessageMap = {
    NEW: 'Создан',
    payment: 'Подтверждение платежа',
    baking: 'Готовится',
    baked: 'Готов',
    delivering: 'Доставляется',
    delivered: 'Доставлен',
};

