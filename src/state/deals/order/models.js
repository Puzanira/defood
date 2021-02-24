/* eslint max-classes-per-file: 0 */
export class Deal {
    constructor({
        kind,
        status,
        parties = [],
        parameters = [],
        transitions = [],
    }) {
        this.kind = kind;
        this.status = status;
        this.parties = parties;
        this.parameters = parameters;
        this.transitions = transitions;
    }

    mapParameters() {
        return Object.entries(this.parameters).map(([key, value]) => ({
            key, value,
        }));
    }

    get parametersArray() {
        return this.mapParameters();
    }

    toJSON() {
        return {
            kind: this.kind,
            status: this.status,
            parties: this.parties,
            parameters: this.mapParameters(),
        };
    }

    set newParties(party) {
        this.parties = [
            ...this.parties,
            party,
        ];
    }

    set newParameters(parameter) {
        this.parameters = [
            ...this.parameters,
            parameter,
        ];
    }
}

export class OrderDeal extends Deal {
    constructor({ parties, parameters }) {
        super({
            kind: 'FirstDeal',
            status: 'created',
            parties,
            parameters,
            transitions: {

            },
        });
    }
}

export class TransferOrderDeal extends Deal {
    constructor({ initiator, baker, deliverer, parameters }) {
        super({
            kind: 'FirstDeal',
            status: 'created',
            parties: [
                { key: initiator, role: 'Initiator ' },
                { key: baker, role: 'Baker' },
                { key: deliverer, role: 'Deliverer' },
            ],
            parameters,
            transitions: [
                {
                    status: 'created',
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
                    statusNext: 'ready',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'ready',
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
                    statusNext: 'closed',
                    roles: [
                        'Initiator',
                    ],
                },
            ],
        });
    }
}

export class InitialOrderDeal extends Deal {
    constructor({ baker, deliverer, parameters }) {
        super({
            kind: 'FirstDeal',
            status: 'created',
            parties: [
                { key: baker, role: 'Baker' },
                { key: deliverer, role: 'Deliverer' },
            ],
            parameters,
            transitions: [
                {
                    status: 'payment',
                    statusNext: 'baking',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'baking',
                    statusNext: 'ready',
                    roles: [
                        'Baker',
                    ],
                },
                {
                    status: 'ready',
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
                    statusNext: 'closed',
                    roles: [
                        'Baker',
                    ],
                },
            ],
        });
    }
}
