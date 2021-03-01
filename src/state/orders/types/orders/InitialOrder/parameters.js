export const getInitialOrderParameters = order => [
    { key: 'Клиент', value: order.parameters.clientContacts.name },
    { key: 'Адрес', value: order.parameters.addressTo },
    { key: 'Телефон', value: order.parameters.clientContacts.tel },
    { key: 'Доставщик', value: 'Delivery Cub' },
];
