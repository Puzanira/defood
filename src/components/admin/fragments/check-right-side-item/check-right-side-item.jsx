import React from 'react';

import './check-right-side-item.css';
import pizza from '../../../../assets/pics/pizza.jpeg';

/**
 * List-part fragment
 * @return {jsx}
 */
export const CheckRightSideItemFragment = () => {
    const dataComp = {
        photo: pizza,
        title: 'Пицца “Бавария” 25см',
        weight: '500 г',
        count: 'х1',
        price: '400 ₽',
    };

    return (
        <div className='check-right-side-item'>
            <img
                alt=''
                className='check-right-side-item__left-part'
                src={dataComp.photo}
            />
            <div className='check-right-side-item__right-part'>
                <div className='check-right-side-item__title'>
                    <div className='check-right-side-item__title-text'>{dataComp.title}</div>
                    <div className='check-right-side-item__weight'>{dataComp.weight}</div>
                </div>
                <div className='check-right-side-item__count'>{dataComp.count}</div>
                <div className='check-right-side-item__price'>{dataComp.price}</div>
            </div>
        </div>
    );
};
