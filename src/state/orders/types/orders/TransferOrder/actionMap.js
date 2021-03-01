export const BakerActionMap = {
    payment: 'update',
    baking: 'update',
    baked: 'wait',
    delivering: 'wait',
    delivered: 'wait',
};

export const BakerActionMessageMap = {
    payment: 'Подтвердите начало готовки заказа',
    baking: 'Подтвердите готовность заказа',
    baked: 'Ожидаем передачу заказа в доставку',
    delivering: 'Ожидаем доставку заказа',
    delivered: 'Подтвердите закрытие заказа',
};


export const InitiatorActionMap = {
    payment: 'wait',
    baking: 'wait',
    baked: 'wait',
    delivering: 'wait',
    delivered: 'update',
};

export const InitiatorActionMessageMap = {
    payment: 'Ожидаем подтверждение платежа',
    baking: 'Ожидаем готовность заказа',
    baked: 'Ожидаем передачу заказа в доставку',
    delivering: 'Ожидаем доставку заказа',
    delivered: 'Подтвердите закрытие заказа',
};
