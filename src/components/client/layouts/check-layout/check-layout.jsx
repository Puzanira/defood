import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { Page } from '../../fragments/page';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { ClientCheckItem } from '../../fragments/client-check-item';


export const CheckLayout = () => {
    const orders = useSelector(state => state.client.orders);
    const orderInProgress = useSelector(state => state.client.orderInProgress);

    const getItems = useAction(
        id => clientActions.getTicketData({ id }),
        [],
    );

    useEffect(() => {
        getItems(0);
        /* eslint react-hooks/exhaustive-deps: 0 */
    }, []);

    return (
        <Page header='small'>
            {!orders || !Object.keys(orders).length && (
                <div className='check_margin'>Текущих заказов не обнаружено</div>
            )}
            {orders && orderInProgress && (
                <>
                    Заказ обрабатывается, пожалуйста, подождите!
                    <CircularProgress className='checkout-item_margin' />
                </>
            )}
            {orders && !orderInProgress && (
                <>
                    {Object.values(orders).map(({ id, localDealId, data }) => (
                        <ClientCheckItem
                            id={id}
                            total={data.total}
                            orderData={data.orderData}
                            localDealId={localDealId}
                            key={localDealId}
                        />
                    ))}
                </>
            )}
        </Page>
    );
};
