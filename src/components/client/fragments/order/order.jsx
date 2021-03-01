import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { OrderItem } from '../order-item';
import './order.css';


export const Order = ({ visible }) => {
    const order = useSelector(state => state.client.order);
    const price = order.reduce((acc, item) => acc + Number(item.price), 0);

    return (
        <div className='order'>
            <div className='order__content'>
                {order && order.map((item, index) => (
                    <OrderItem
                        key={index}
                        item={item}
                        visible={visible}
                    />
                ))}
            </div>
            <div className='order__sum'>
                <div>Итого:</div>
                <div>{ price } ₽</div>
            </div>
        </div>
    );
};
