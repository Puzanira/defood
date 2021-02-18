import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { OrderItem } from '../order-item';

import './order.css';


export const Order = () => {
    const data = useSelector(state => state.client.order);
    const price = data.reduce((acc, item) => acc + Number(item.price), 0);
    const orderItems = data.map((item, index) => <OrderItem key={index} item={item} />);

    return (
        <div className='order'>
            <div className='order__content'>
                { orderItems }
            </div>
            <div className='order__sum'>
                <div>Итого:</div>
                <div>{ price } ₽</div>
            </div>
        </div>
    );
};
