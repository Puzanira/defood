import React from 'react';

import './footer.css';


export const Footer = ({ config }) => {
    const { title } = config;

    return (
        <div className='page-footer'>
            <div className='page-footer__title'>{ title }</div>
            <div className='page-footer__item'>
                <div className='page-footer__item-title'>Информация</div>
                <div className='page-footer__item-link'>Контакты</div>
                <div className='page-footer__item-link'>Доставка и оплата</div>
                <div className='page-footer__item-link'>Сотрудничество</div>
            </div>
            <div className='page-footer__item'>
                <div className='page-footer__item-title'>Информация</div>
                <div className='page-footer__item-link'>Контакты</div>
                <div className='page-footer__item-link'>Доставка и оплата</div>
                <div className='page-footer__item-link'>Сотрудничество</div>
            </div>
            <div className='page-footer__item'>
                <div className='page-footer__item-title'>Информация</div>
                <div className='page-footer__item-link'>Контакты</div>
                <div className='page-footer__item-link'>Доставка и оплата</div>
                <div className='page-footer__item-link'>Сотрудничество</div>
            </div>
            <div className='page-footer__item'>
                <div className='page-footer__item-title'>Информация</div>
                <div className='page-footer__item-link'>Контакты</div>
                <div className='page-footer__item-link'>Доставка и оплата</div>
                <div className='page-footer__item-link'>Сотрудничество</div>
            </div>
        </div>
    );
};
