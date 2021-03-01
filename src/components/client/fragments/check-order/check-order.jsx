import React from 'react';

import { OrderItem } from '../order-item';

import '../order';


export const CheckOrder = ({ order }) => {
    const price = order.total;
    const orderItems = order.orderData.map((item, index) =>
        <OrderItem key={index} item={item} visiable={1} />);

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
