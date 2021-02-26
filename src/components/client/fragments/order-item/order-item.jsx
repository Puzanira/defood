import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';

import './order-item.css';
import pizza from '../../../../assets/pics/pizza.jpeg';


export const OrderItem = props => {
    const { title, size, price } = props.item;

    const removeOrderItem = useAction(
        () => clientActions.deleteOrderItem({ item: props.item }),
        [],
    );

    const cancelButton = props.visible === 'true' ? <CancelIcon className='order-item__toggle' data-title={title} onClick={removeOrderItem} /> : null;

    return (
        <div className='order-item'>
            <div className='order-item__left-bar'>
                <img alt='order-pizza-pic' className='order-item__img' src={pizza} />
                <div className='order-item__content'>
                    <div className='order-item__title'>{title} {size}</div>
                    <div className='order-item__subtitle'>500г</div>
                </div>
            </div>
            <div className='order-item__right-bar'>
                <div className='order-item__count'>x 1</div>
                <div className='order-item__price'>{price} ₽</div>
                { cancelButton }
            </div>
        </div>
    );
};
