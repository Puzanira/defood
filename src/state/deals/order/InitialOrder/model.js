import { Deal } from '../../core/models';


export class InitialOrderDeal extends Deal {
    constructor({ baker, deliverer, parameters }) {
        super({
            kind: 'FirstDeal',
            parties: [
                { key: baker, role: 'Baker' },
                { key: deliverer, role: 'Deliverer' },
            ],
            parameters: { ...parameters, type: 'InitialOrder' },
            transitions: [
                {
                    status: 'NEW',
                    statusNext: 'payment',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'payment',
                    statusNext: 'baking',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'baking',
                    statusNext: 'baked',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'baked',
                    statusNext: 'delivering',
                    roles: [
                        'Deliverer',
                    ],
                },
                {
                    status: 'delivering',
                    statusNext: 'delivered',
                    roles: [
                        'Deliverer',
                    ],
                },
                {
                    status: 'delivered',
                    statusNext: 'Closed',
                    roles: [
                        'Baker',
                    ],
                },
            ],
        });
    }
}
