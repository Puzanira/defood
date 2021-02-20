// Just created
export const orderMock = {
    status: 'created',
    parameters: {
        clientContacts: {
            addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
            name: 'Ольга Павлова',
            tel: '+7 916 720 64 95',
        },
        orderData: [
            {
                title: 'Маргaрита',
                price: '1000',
                size: '30',
            },
            {
                title: 'Четыре сыра',
                price: '800',
                size: '25',
            },
        ],
        total: 1800,
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
        clientContacts: {
            addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
            name: 'Ольга Павлова',
            tel: '+7 916 720 64 95',
        },
        orderData: [
            {
                title: 'Маргaрита',
                price: '1000',
                size: '30',
            },
            {
                title: 'Четыре сыра',
                price: '800',
                size: '25',
            },
        ],
        total: 1800,
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

export const pagedDeliveryData = {
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
    ],
};

export const deliveryOrderMock = {
    dealId: 'ad04c39314184ac0847304fc22eaac75:fc5567d419c647e0b4f8806dc8d3a9ae',
    queueId: 1,
    localDealId: 3511,
    status: 'accepting',
    parameters: {
        addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
        addressFrom: 'Москва, Рязанский проспект 14 к2',
        clientContacts: 'Ольга Павлова, +7 916 720 64 95',
    },
    history: [
        {
            status: 'created',
            version: 2,
            remark: 'REMARK',
            executor: 'CLIENT1',
        },
    ],
};

export const checkData = {
    clientContacts: {
        addressTo: 'Москва, ул. Юных Ленинцев 12/17 к1',
        name: 'Ольга Павлова',
        tel: '+7 916 720 64 95',
    },
    orderData: [
        {
            title: 'Маргaрита',
            price: '1000',
            size: '30',
        },
        {
            title: 'Четыре сыра',
            price: '800',
            size: '25',
        },
    ],
    total: 1800,
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

export const headerData = {
    pizza1: {
        ordersPath: '/admin/',
        indexTitle: 'DePi1 Admin',
        style: 'header_depi1',
    },
    pizza2: {
        ordersPath: '/admin/',
        indexTitle: 'DePi2 Admin',
        style: 'header_depi2',
    },
    delivery: {
        ordersPath: '/delivery/',
        indexTitle: 'DePi Delivery',
        style: 'header_delivery',
    },
};
