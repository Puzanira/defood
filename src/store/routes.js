export const RouterStore = {
    website: {
        index: '/',
        check: '/check/:id',
        order: '/order/',
    },
    admin: {
        pizza1: {
            index: '/admin/pizza1/',
            order: '/admin/pizza1/order/:id',
        },
        pizza2: {
            index: '/admin/pizza2/',
            order: '/admin/pizza2/order/:id',
        },
    },
    delivery: {
        index: '/delivery/',
        order: '/delivery/order/:id',
    },
};
