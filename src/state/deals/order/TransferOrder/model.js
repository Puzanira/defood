import { Deal } from '../../core/models';


export class TransferOrderDeal extends Deal {
    constructor({ initiator, baker, deliverer, parameters }) {
        super({
            type: 'Transfer',
            kind: 'FirstDeal',
            parties: [
                { key: initiator, role: 'Initiator' },
                { key: baker, role: 'Baker' },
                { key: deliverer, role: 'Deliverer' },
            ],
            parameters: { ...parameters, type: 'TransferOrder' },
            transitions: [
                {
                    status: 'NEW',
                    statusNext: 'payment',
                    roles: [
                        'Initiator',
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
                        'Initiator',
                    ],
                },
            ],
        });
    }
}
