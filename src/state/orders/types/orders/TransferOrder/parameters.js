export const getTransferInitiatorOrderParameters = order => [
    { key: 'Исполнитель', value: order.parameters.baker },
    { key: 'Клиент', value: order.parameters.clientContacts.name },
    { key: 'Адрес', value: order.parameters.addressTo },
    { key: 'Телефон', value: order.parameters.clientContacts.tel },
    { key: 'Доставщик', value: 'Delivery Cub' },
];

export const getTransferBakerOrderParameters = order => [
    { key: 'Передан от', value: order.parameters.initiator },
    { key: 'Доставщик', value: 'Delivery Cub' },
];
