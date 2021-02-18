// Just created
export const orderMock = {
    status: 'created',
    parameters: {
        addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
        price: 1150,
        orderData: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30см, пицца “Карбонара" 25см',
        clientContacts: 'Ярина Анастасия Дмитриевна +791298481586',
    },
};

// With updated parameters
// You can have a localdealId but no dealId
// should perform get call to get dealId
export const orderMock2 = {
    dealId: 'ad04c39314184ac0847304fc22eaac75:fc5567d419c647e0b4f8806dc8d3a9ae',
    queueId: 1,
    localDealId: 3511,
    status: 'processing',
    parameters: {
        addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
        price: 500,
        orderData: 'пицца “Карбонара" 30см',
        clientContacts: 'Булаков Олег Игоревич +791298481586',
    },
    history: [
        {
            status: 'created',
            version: 2,
            remark: 'REMARK',
            executor: 'CLIENT1',
        },
        {
            status: 'accepting',
            version: 3,
            remark: 'REMARK2',
            executor: 'CLIENT2',
        },
        {
            status: 'payment',
            version: 3,
            remark: 'REMARK2',
            executor: 'CLIENT2',
        },
    ],
};

export const pagedData = {
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 3,
    data: [
        {
            dealId: 'ad04c39314184ac0847304fc22eaac75:fc5567d419c647e0b4f8806dc8d3a9ae',
            localDealId: 3511,
            kind: 'FirstDeal',
            version: 8,
            status: 'processing',
        },
        {
            dealId: null,
            localDealId: 3510,
            kind: 'FirstDeal',
            version: 0,
            status: 'created',
        },
        {
            dealId: 'ad04c39314184ac0847304fc22eaac75:57af8d5e2cde483b84f761038bd902ff',
            localDealId: 3509,
            kind: 'FirstDeal',
            version: 3,
            status: 'accepting',
        },
    ],
};

export const checkData = {
    title: 'Заказ №1212121',
    address: {
        title: 'Доставка по адресу',
        value: 'Москва, ул. Юных Ленинцев 12/17 к1',
    },
    recipient: {
        title: 'Получатель',
        value: 'Ольга, +7 916 720 64 95',
    },
    processingTime: {
        title: 'Время оформления',
        value: '2 февраля 2021 17:00',
    },
    payment: {
        title: 'Оплата',
        value: 'Онлайн на сайте',
    },
    resultPrice: '950 ₽',
};

export const searchFilters = {
    Статус: [
        'created',
        'accepting',
        'payment',
        'processing',
        'transferringToPizza',
        'deliveryAgreement',
        'baking',
        'transferredToDelivery',
        'closed',
    ],
};
