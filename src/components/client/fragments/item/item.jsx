import React from 'react';

import { clientActions } from '../../../../state/client/actions';
import { useAction } from '../../../../utils';
import { PizzaStore } from '../../../../store/pizza';
import './item.css';


export const Item = ({ data }) => {
    // const { title, size, about, price, photo, baker } = data;
    const { title, size, about, price, baker } = data;
    const item = { title, size, price, baker };

    const addOrder = useAction(
        () => clientActions.setOrderItem({ item }),
        /* eslint react-hooks/exhaustive-deps: 0 */
        [],
    );

    return (
        <div className='item'>
            <div className='item__content'>
                <div className='item__title'>{ title }</div>
                <div className='item__subtitle'>{ size } см</div>
                <div className='item__info'>
                    { about }
                </div>
                <div className='item__wrap'>
                    <div className='item__toggle' onClick={addOrder}>Добавить в корзину</div>
                    <div className='item__price'>{ price }</div>
                    <div className='item__price'>₽</div>
                </div>
            </div>
            <div className='item__img-wrap'>
                <img alt='pizza' className='item__img' src={PizzaStore[title]} />
            </div>
        </div>
    );
};
