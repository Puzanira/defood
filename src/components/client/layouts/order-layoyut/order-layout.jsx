import React from 'react';

import { Page } from '../../fragments/page';
import { Order } from '../../fragments/order';

import './order-layout.css';


export const OrderLayout = () => (
    <Page>
        <Order />
        <form className='checkout'>
            <div className='checkout__title'>Оформление заказа</div>
            <div className='checkout-item'>
                <div className='checkout-item__title'>Имя</div>
                <input className='checkout-item__input' type='text' />
            </div>
            <div className='checkout-item'>
                <div className='checkout-item__title'>Номер телефон</div>
                <input className='checkout-item__input' type='text' />
            </div>
            <div className='checkout-item'>
                <div className='checkout-item__title'>Адрес доставки</div>
                <input className='checkout-item__input' type='text' />
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
            <input className='checkout__submit' type='submit' value='Оформить' />
        </form>
    </Page>
);


