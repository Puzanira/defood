import React, { Component } from 'react';

import { OrderItem } from '../order-item';
import './order.css';


export const Order = () => (
    <div className='order'>
        <div className='order__content'>
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
        <div className='order__sum'>
            <div>Итого:</div>
            <div>950 ₽ </div>
        </div>
    </div>
);
