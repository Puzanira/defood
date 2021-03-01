import React from 'react';
import { useSelector } from 'react-redux';

import { LoginLayout } from '../login-layout';


export const AuthComponent = ({ children }) => {
    const authorized = useSelector(({ auth }) => auth.authorized);
    console.log(authorized);

    if (!authorized)
        return <LoginLayout />;

    return (
        <>
            {children}
        </>
    );
};
