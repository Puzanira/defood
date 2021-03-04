// What to do next after reaching a status
export const actionMap = {
    payment: 'wait',
    baking: 'wait',
    baked: 'update',
    delivering: 'update',
    delivered: 'wait',
};

// What to do next after reaching a status
export const actionMessageMap = {
    payment: 'Ожидаем готовность заказа',
    baking: 'Ожидаем готовность заказа',
    baked: 'Подтвердите передачу заказа в доставку',
    delivering: 'Подтвердите доставку заказа',
    delivered: 'Ожидаем закрытие заказа',
};
