export const config = {
    apiScheme: 'https://',
    apiPath: 'kekker.com/api',
    channel: process.env.REACT_APP_CHANNEL || 'puzanova.ira2011@yandex.ru',
    authorization: process.env.REACT_APP_AUTHORIZATION || 'Basic S2Vra2VyVXNlcjp6RGZqbTMz',
    xApiVersion: '2.0',
    nodes: {
        PIZZA1: 'qrm1',
        PIZZA2: 'qrm2',
        DELIVERY: 'qrm3',
    },
    addresses: {
        PIZZA1: 'Pizza 1 address',
        PIZZA2: 'Pizza 2 address',
    },
    nodeType: process.env.REACT_APP_NODE_TYPE || 'pizza1',
};
