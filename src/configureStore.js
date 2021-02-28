import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { state } from './state';
import { createRootSaga } from './core/state/utils';


const persistConfig = {
    key: 'root',
    storage,
};

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    ...state.reducer.main,
});

const history = createBrowserHistory();
const persistedReducer = persistReducer(
    persistConfig, createRootReducer(history),
);
const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
    const middleware = [sagaMiddleware, routerMiddleware(history)];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    );
    store.persistor = persistStore(store);
    store.history = history;

    sagaMiddleware.run(createRootSaga(
        {
            sagas: [...state.sagas],
        },
    ));
    return store;
}

export const store = configureStore({});
