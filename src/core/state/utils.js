import fp from 'lodash/fp';
import { all, take, cancel } from 'redux-saga/effects';


export const prefixTypes = (prefix, types) => fp.mapValues(type => `${prefix}/${type}`, types);

export const createAction = type =>
    Object.assign(
        $payload => ({ type, $payload }),
        {
            toString: () => type,
        },
    );

const mapReducerParts = fp.pipe(
    fp.mapValues('reducer'),
    fp.pickBy(fp.identity),
);

const mapSagasParts = fp.pipe(
    fp.mapValues('sagas'),
    fp.values,
    fp.filter(fp.identity),
    fp.flatten,
);

export const mergeStateParts = (prefix, parts) => ({
    reducer: {
        [prefix]: mapReducerParts(parts),
    },
    sagas: mapSagasParts(parts),
});

const ABORT_SAGAS_HMR = 'ABORT_SAGAS_HMR';

export const createRootSaga = ({ sagas }) => {
    if (process.env.NODE_ENV === 'development') {
        return function* main() {
            yield all(sagas);

            yield take(ABORT_SAGAS_HMR);
            yield cancel();
        };
    }

    return function* main() {
        yield all(sagas);
    };
};

export const abortSagas = store => store.dispatch({ type: ABORT_SAGAS_HMR });

/* REDUCER HELPERS */
export const lookupTableReducer = (
    defaultState,
    lookupTable,
) =>
    (state = defaultState, { type, $payload, ...props }) =>
        type in lookupTable
            ? lookupTable[type](state, $payload, props)
            : state;
