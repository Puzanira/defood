import React from 'react';

import { CheckRightSideItemFragment } from '../check-right-side-item';
import './admin-order.css';


export const AdminOrderParameters = ({ id, total, leftSideParameters, rightSideParameters }) => (
    <>
        <div className='admin-order-layout-title admin-order-layout-title_margin-bottom'>
            Заказ № {id}
        </div>
        <div className='admin-order-content'>
            <div className='admin-order-content__left-side'>
                {leftSideParameters && leftSideParameters.map(({ key, value }) => (
                    <div key={key} className='admin-order-content-item'>
                        <div className='admin-order-content-item__title'>{key}</div>
                        <div className='admin-order-content-item__text'>{value}</div>
                    </div>
                    ))}
            </div>
            <div className='admin-order-content__right-side'>
                <div className='admin-order-right-side-items'>
                    {rightSideParameters && rightSideParameters.map((elem, index) => (
                        <CheckRightSideItemFragment data={elem} key={index} />
                    ))}
                </div>
                <div className='admin-order-right-side-price'>
                    <div className='admin-order-right-side-price__result'>Итого</div>
                    <div className='admin-order-right-side-price__price'>{total}</div>
                </div>
            </div>
        </div>
    </>
);
