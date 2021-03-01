import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Page } from '../../fragments/page';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';

import { ClientCheckItem } from '../../fragments/client-check-item';
import { CircularProgress } from '@material-ui/core';


export const CheckLayout = () => {
    const orders = useSelector(state => state.client.orders);
    const isOrderCreated = useSelector(state => state.client.isOrderCreated);

    const getItems = useAction(
        id => clientActions.getTicketData({ id }),
        [],
    );

    const setIsOrderCreated = useAction(
        () => clientActions.setIsOrderCreated('disabled'),
        [],
    );

    useEffect(() => {
        getItems(0);
    }, []);

    return (
        <Page header='small'>
            {isOrderCreated !== 'disabled' && (
                <div className='check-agreement check-agreement_no-margin'>
                    {isOrderCreated === 'inProcess' && (
                        <>
                            Заказ обрабатывается, пожалуйста, подождите!
                            <CircularProgress className='checkout-item_margin' />
                        </>
                    )}
                    {isOrderCreated === 'ready' && (
                        <>
                            <div>Ваш заказ готов!</div>
                            <div onClick={setIsOrderCreated} className='check-agreement__button check-agreement__button_agree checkout-item_margin'>Закрыть уведомление</div>
                        </>
                    )}
                </div>
            )}

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
                    <div className='check_margin'>Текущих заказов не обнаружено</div>
                </>
            )}
        </Page>
    );
};
