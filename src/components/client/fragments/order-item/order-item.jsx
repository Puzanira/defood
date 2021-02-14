import React from 'react';

import './order-item.css';
import pizza from '../../../../assets/pics/pizza.jpeg';


export const OrderItem = () => (
    <div className='order-item'>
        <div className='order-item__left-bar'>
            <img alt='order-pizza-pic' className='order-item__img' src={pizza} />
            <div className='order-item__content'>
                <div className='order-item__title'>Пицца Маргарита 30см</div>
                <div className='order-item__subtitle'>500г</div>
            </div>
        </div>
        <div className='order-item__right-bar'>
            <div className='order-item__count'>x 1</div>
            <div className='order-item__price'>400 ₽</div>
        </div>
    </div>
);

