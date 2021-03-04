import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';

import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { PizzaStore } from '../../../../store/pizza';
import './order-item.css';


export const OrderItem = ({ item, visible }) => {
    const { title, size, price } = item;

    const removeOrderItem = useAction(
        () => clientActions.deleteOrderItem({ item }),
        [item],
    );

    return (
        <div className='order-item'>
            <div className='order-item__left-bar'>
                <img alt='order-pizza-pic' className='order-item__img' src={PizzaStore[title]} />
                <div className='order-item__content'>
                    <div className='order-item__title'>{title} {size}</div>
                    <div className='order-item__subtitle'>500г</div>
                </div>
            </div>
            <div className='order-item__right-bar'>
                <div className='order-item__price'>{price} ₽</div>
                {visible && (
                    <CancelIcon className='order-item__toggle' data-title={title} onClick={removeOrderItem} />
                )}
            </div>
        </div>
    );
};
