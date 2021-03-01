export const RouterStore = {
    website: {
        index: '/',
        check: '/check/',
        order: '/orders/',
        pizza: '/pizza/:slug',
        list: '/menu/',
    },
    admin: {
        index: '/admin/',
        order: '/admin/orders/:id',
    },
    delivery: {
        index: '/deliveryPart/',
        order: '/deliveryPart/orders/:id',
    },
};
