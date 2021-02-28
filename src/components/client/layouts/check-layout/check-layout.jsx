import React, { useEffect } from 'react';
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
            {orders && Object.keys(orders).length ? (
                <>
                    {Object.values(orders).map(item => (
                        <ClientCheckItem
                            id={item.id}
                            data={item.data}
                            localDealId={item.localDealId}
                            key={item.localDealId}
                        />
                    ))}
                </>
            ) : (
                <>
                    <div>Текущих заказов не обнаружено</div>
                </>
            )}
        </Page>
    );
};
