import React from 'react';

import { OrderItem } from '../order-item';

import '../order';


export const CheckOrder = ({ total, orderData, isClose }) => (
    <div className='order'>
        <div className='order__content'>
            {orderData && orderData.map((item, index) => (
                <OrderItem
                    key={index}
                    item={item}
                    visible={isClose}
                />
            ))}
        </div>
        <div className='order__sum'>
            <div>Итого:</div>
            <div>{ total } ₽</div>
        </div>
    </div>
);
