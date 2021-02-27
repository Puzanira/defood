import React from 'react';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { Page } from '../../fragments/page';
import { Order } from '../../fragments/order';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import './order-layout.css';


export const OrderLayout = () => {
    const order = useSelector(state => state.client.order);
    const isOrderCreated = useSelector(state => state.client.isOrderCreated);

    const fetchFormData = useAction(
        formData => clientActions.fetchFormData({ formData }),
        [],
    );

    const emptyTresh = useAction(
        () => clientActions.emptyTrash(),
        [],
    );

    const setIsOrderCreated = useAction(
        () => clientActions.setIsOrderCreated('disabled'),
        [],
    );

    return (
        <Page>
            <Order />
            <Form
                onSubmit={fetchFormData}
                render={({ handleSubmit }) => (
                    <form className='checkout' onSubmit={handleSubmit}>
                        <div className='checkout__title'>Оформление заказа</div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Имя</div>
                            <Field className='checkout-item__input' name='name' type='text' component='input' />
                        </div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Номер телефон</div>
                            <Field className='checkout-item__input' name='number' type='text' component='input' />
                        </div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Адрес доставки</div>
                            <Field className='checkout-item__input' name='address' type='text' component='input' />
                        </div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Способ оплаты</div>
                            <div className='checkout-item__wrap'>
                                <div className='checkout-item__card'>Картой</div>
                                <div className='checkout-item__card'>Наличными</div>
                                <div className='checkout-item__card'>Яндекс Деньги</div>
                                <div className='checkout-item__card'>Web Money</div>
                            </div>
                        </div>
                        <button className='checkout__submit' type='submit' disabled={order.length === 0}>Оформить</button>
                    </form>
                )}
            />

            {isOrderCreated === 'inProcess' && (
                <div className='check-agreement'>
                    Заказ обрабатывается, пожалуйста, подождите!
                    <CircularProgress className='checkout-item_margin' />
                    <div onClick={setIsOrderCreated} className='check-agreement__button check-agreement__button_agree checkout-item_margin'>Прекратить ожидание</div>
                </div>
            )}

            {isOrderCreated === 'ready' && (
                <div className='check-agreement'>
                    <div>Ваш заказ готов!</div>
                    <div>Отследить можете в <Link to='/check/'>меню с заказами</Link></div>

                    <div onClick={emptyTresh} className='check-agreement__button check-agreement__button_agree checkout-item_margin'>Очистить корзину</div>
                </div>
            )}
        </Page>
    );
};


