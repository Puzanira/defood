import { put, takeLatest } from 'redux-saga/effects';

import { authActions, authActionTypes } from './actions';


const appLogin = process.env.REACT_APP_LOGIN;
const appPassword = process.env.REACT_APP_PASSWORD;

function* authorize({ $payload: { formData } }) {
    const { login, phrase } = formData;
    if (login === appLogin && phrase === appPassword)
        yield put(authActions.setStatus({ authorized: true }));
     else
        console.log('Login Failed');
}

export const sagas = [
    takeLatest(authActionTypes.AUTHORIZE, authorize),
];
