export const config = {
    apiScheme: 'https://',
    apiPath: 'kekker.com/api',
    channel: process.env.REACT_APP_CHANNEL || '',
    authorization: process.env.REACT_APP_AUTHORIZATION || '',
    xApiVersion: '2.0',
    parties: {
        PIZZA1: {
            name: 'PIZZA 1 DoDoDo',
            node: 'qrm1',
            address: 'Pizza 1 address',
            ordersPath: '/admin/',
            indexTitle: 'DePi1 Admin',
            style: 'header_depi1',
        },
        PIZZA2: {
            name: 'PIZZA 2 Domino',
            node: 'qrm2',
            address: 'Pizza 2 address',
            ordersPath: '/admin/',
            indexTitle: 'DePi2 Admin',
            style: 'header_depi2',
        },
        DELIVERY: {
            node: 'qrm3',
            ordersPath: '/admin/',
            indexTitle: 'DePi Delivery',
            style: 'header_delivery',
        },
    },
    zone: {
        PIZZA1: 'Zone 1',
        PIZZA2: 'Zone 2',
    },
    time: {
        fast: '30 min',
        slow: '2 hours',
    },
};

export const NODE = process.env.REACT_APP_NODE_TYPE || 'PIZZA1';
export const NODE_CONFIG = config.parties[NODE];
