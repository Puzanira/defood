import React, { Component, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '../../fragments/page';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';

import { ClientCheckItem } from '../../fragments/client-check-item';


export const CheckLayout = () => {
    const orders = useSelector(state => state.client.orders);

    const getItems = useAction(
        id => clientActions.getTicketData({ id }),
        [],
    );

    useEffect(() => {
        getItems(0);
    }, []);

    return (
        <Page header='small'>
            {Object.keys(orders).map((item, index) => (
                <ClientCheckItem itemData={orders[item]} key={index} />
            ))}
        </Page>
    );
};
