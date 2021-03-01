import React from 'react';

import { OrderItem } from '../order-item';

import '../order';


export const CheckOrder = ({ total, orderData }) => (
    <div className='order'>
        <div className='order__content'>
            {orderData && orderData.map((item, index) => (
                <OrderItem
                    key={index}
                    item={item}
                    visible={1}
                />
            ))}
        </div>
        <div className='order__sum'>
            <div>Итого:</div>
            <div>{ total } ₽</div>
        </div>
    </div>
);
