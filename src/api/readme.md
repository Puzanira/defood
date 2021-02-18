Методы и параметры вызовов описаны в файле kekker.js
Вызов к api осуществляется следующим образом: 

`callApi(request, node, callArgs)`, где:
* request - это описанный в файле kekker.js вызов
* node - это узел, от которого вызывается данная функция (PIZZA1, PIZZA2, DELIVERER)
 их значения брать из config.js в папке src
* callArgs - параметры вызова

#### Пример:  
Реализация вызова из kekker.js
```js
const dealsPart = withUrl('deals');
export const dealsApi = {
    createDeal: post(
        ({ params }) => dealsPart({
            body: {
                ...params,
            },
        }),
    ),
}
```

Сам вызов функции
```js
    callApi(dealsApi.createDeal, config.nodes.PIZZA1, {
        params: {
          kind: 'FirstDeal',
          parties: [
              { key: 'QRM1', role: 'Sender' },
              { key: 'QRM2', role: 'Receiver' },
          ],
        },
      })
```

Таким образом произойдет POST-запрос с нужными параметрами и хедерами на 
`https://qrm1.kekker.com/api/deals` (в конфиге PIZZA1 = 'qrm1') и body:
`{kind: "FirstDeal", parties: [{key: "QRM1", role: "Sender"}, {key: "QRM2", role: "Receiver"}]}`


callApi - это промис, его можно дождаться await, но лучше вызывать только
из саг:

```js
const deal = yield callApi(dealsApi.createDeal, config.nodes.PIZZA1, { .... } );
yield put(clientActions.setDeal(deal));
```
