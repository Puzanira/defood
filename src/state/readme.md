В редьюере пишутся функции, которые напрямую изменяют стейт
В сагах - остальные функции. Из саг можно вызвать функции редьюсера, чтобы изменить стейт
Примеры смотреть в папке repo.

Из компонентов получать данные стейта можно так:
```js
    import { useSelector } from 'react-redux';


    const currentDirectoryName = useSelector(state => state.admin.currentDirectory);
    const currentDirectoryContent = useSelector(state => state.client.currentDirectoryContent);
```

А использовать функции (из саг или редьюсера можно так):
```js
    import { useAction } from '../utils';
    import { repoActions } from '../state/repo/actions';


    const getRepo = useAction(
        formData => repoActions.getRepo({ formData }),
        [],
    );
```
