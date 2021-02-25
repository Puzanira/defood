import {
    get, post, withUrl,
} from './core/request';


const dealsPart = withUrl('deals');

export const dealsApi = {
    /*  Creates a new deal with given participants.
        BODY: {
            "kind": "FirstDeal",
            "parties": [
                { "key": "QRM1", "role": "Sender" },
                { "key": "QRM2", "role": "Receiver" }
            ],
            parameters: [
                { "key": "DocNumber", "value": "123" }
            ],
        }

        RESPONSE:
        the Queue identifier [QUEUID] and
        the Local Deal Identifier [LOCALDEALID]
        {
          "queueId": "QUEUEID",
          "localDealId": "LOCALDEALID"
        }
     */
    getDeals: get(
        () => dealsPart(),
    ),
    createDeal: post(
        ({ deal }) => dealsPart({
            body: {
                ...deal,
            },
        }),
    ),

    /*  Change the Deal status by using local Deal Id or global deal id
        BODY: { "status": "Created" }
        RESPONSE: empty
     */
    changeStatus: post(
        ({ status, id }) => dealsPart({
            path: id,
            body: {
                status,
            },
        }),
    ),
    updateParameters: post(
        ({ parameters, id }) => dealsPart({
            path: id,
            body: {
                parameters,
            },
        }),
    ),

    /*  Update the Deal by using dealId
        BODY: {
            "status": "Ajusted",
            "remark": "2",
            "parameters": [
            {
              "key": "PaymentDate",
              "value": "2020-01-02"
            }]
        }
        RESPONSE: empty
     */
    updateDeal: post(
        ({ dealData, id }) => dealsPart({
            path: id,
            body: {
                ...dealData,
            },
        }),
    ),

    /*  Get current Deal by using global deal identifier
        RESPONSE: {
          "dealId": "DEALID",
          "localDealId": "LOCALDEALID",
          "kind": "FirstDeal",
          "version": 2,
          "status": "Created",
          "parent": null,
          "parameters": [
            {
          .....
          other deal data
     */
    getDeal: get(
        ({ id }) => dealsPart({
            path: id,
        }),
    ),
};


const queuePart = withUrl('queue');

export const queueApi = {
    /*  Get current operation status
        RESPONSE: {
          "dealId": "DEALID",
          "localDealId": "LOCALDEALID",
          "queueId": "QUEUEID",
          "status": "Success"
        }
     */
    getQueueStatus: get(
        ({ id }) => queuePart({
            path: id,
        }),
    ),
};
