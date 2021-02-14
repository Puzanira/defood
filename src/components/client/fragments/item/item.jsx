import React from 'react';

import pizza from '../../../../assets/pics/pizza.jpeg';
import './item.css';


export const Item = () => (
    <div className='item'>
        <div className='item__content'>
            <div className='item__title'>Маргарита</div>
            <div className='item__subtitle'>30 см</div>
            <div className='item__info'>
                соус томатный масло оливковое сыр Моцарелла подимодры базилик
            </div>
            <div className='item__wrap'>
                <div className='item__toggle'>Добавить в корзину</div>
                <div className='item__price'>1000 ₽</div>
            </div>
        </div>
        <div className='item__img-wrap'>
            <img alt='pizza' className='item__img' src={pizza} />
        </div>
    </div>
);
