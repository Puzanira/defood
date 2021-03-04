export const BakerActionMap = {
    payment: 'update',
    baking: 'update',
    baked: 'wait',
    delivering: 'wait',
    delivered: 'update',
};

export const BakerActionMessageMap = {
    payment: 'Подтвердите поступление платежа',
    baking: 'Подтвердите готовность заказа',
    baked: 'Ожидаем передачу заказа в доставку',
    delivering: 'Ожидаем доставку заказа',
    delivered: 'Подтвердите закрытие заказа',
};
