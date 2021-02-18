export const RouterStore = {
    website: {
        index: '/',
        check: '/check/',
        order: '/order/',
    },
    admin: {
        index: '/admin/',
        check: '/admin/order/:id',
    },
    delivery: {
        index: '/delivery/',
        check: '/delivery/order/:id',
    },
};
