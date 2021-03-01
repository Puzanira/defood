export const getDeliveryOrderParameters = order => [
    { key: 'Исполнитель', value: order.parameters.baker },
    { key: 'Адрес получения', value: order.parameters.addressFrom },
    { key: 'Адрес доставки', value: order.parameters.addressTo },
    { key: 'Получатель', value: order.parameters.clientContacts.name },
    { key: 'Телефон получателя', value: order.parameters.clientContacts.tel },
];
