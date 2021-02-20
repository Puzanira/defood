// export class Deal {
//     constructor(initiator, deliveryNode, parameters=[]) {
//         this.kind = 'FirstDeal';
//         this.status = 'created';
//         this.parties = [
//             {
//                 key: initiator,
//                 role: 'Sender',
//             },
//             {
//                 key: deliveryNode,
//                 role: 'Receiver',
//             },
//         ];
//         this.parameters = parameters;
//     }
// }

export class Deal {
    constructor({ kind, status, parties=[], parameters=[], transitions=[], parent='', appRef='' }) {
        this.kind = kind;
        this.status = status;
        this.parent = parent;
        this.appRef = appRef;
        this.parties = parties
        this.parameters = parameters;
        this.transitions = transitions;
    }

    set newParties(party) {
        this.parties = [
            ...this.parties,
            party
        ];
    }

    set newParameters(parameter) {
        this.parameters = [
            ...this.parameters,
            parameter
        ];
    }
}

export class OrderDeal extends Deal {
    constructor(initiator, deliveryNode, parameters) {
        super({
            kind: 'FirstDeal',
            status: 'created',
            parties: [
                {
                    key: initiator,
                    role: 'Sender',
                },
                {
                    key: deliveryNode,
                    role: 'Receiver',
                },
            ],
            parameters,
        });
    }
}
