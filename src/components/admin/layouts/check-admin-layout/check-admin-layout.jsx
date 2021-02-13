import React, { useReducer } from 'react';

import { AdminPageFragment } from '../../fragments/admin-page';
import { CheckRightSideItemFragment } from '../../fragments/check-right-side-item';
import { CheckActivityFragment } from '../../fragments/check-activity';
import { TransferSelectFragment } from '../../fragments/transfer-select';

import './check-admin-layout.css';


/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
    const data = {
        title: 'Заказ №1212121',
        address: {
            title: 'Доставка по адресу',
            value: 'Москва, ул. Юных Ленинцев 12/17 к1',
        },
        recipient: {
            title: 'Получатель',
            value: 'Ольга, +7 916 720 64 95',
        },
        processingTime: {
            title: 'Время оформления',
            value: '2 февраля 2021 17:00',
        },
        payment: {
            title: 'Оплата',
            value: 'Онлайн на сайте',
        },
        resultPrice: '950 ₽',
    };

    const initialState = {
        dataComp: data,
        isTransferred: false,
        isTransferAgreement: true,
    };

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return { ...state, [action.field]: action.value };
                default:
                    return state;
            }
        },
        initialState,
    );

    const changeField = (field, value) => {
        dispatch({ type: 'CHANGE_FIELD', field, value });
    };

    const {
        dataComp,
        isTransferred,
        isTransferAgreement,
    } = state;

    const transferHandler = () => {
        changeField('isTransferred', !isTransferred);
    };

    const agreementHandler = () => {
        changeField('isTransferAgreement', false);
    };

    return (
        <AdminPageFragment>
            <div className='admin-check-layout-title admin-check-layout-title_margin-bottom'>
                {dataComp.title}
            </div>
            <div className='admin-check-content'>
                <div className='admin-check-content__left-side'>
                    <div className='admin-check-content-item'>
                        <div className='admin-check-content-item__title'>{dataComp.address.title}</div>
                        <div className='admin-check-content-item__text'>{dataComp.address.value}</div>
                    </div>
                    <div className='admin-check-content-item'>
                        <div className='admin-check-content-item__title'>{dataComp.recipient.title}</div>
                        <div className='admin-check-content-item__text'>{dataComp.recipient.value}</div>
                    </div>
                    <div className='admin-check-content-item'>
                        <div className='admin-check-content-item__title'>{dataComp.processingTime.title}</div>
                        <div className='admin-check-content-item__text'>{dataComp.processingTime.value}</div>
                    </div>
                    <div className='admin-check-content-item'>
                        <div className='admin-check-content-item__title'>{dataComp.payment.title}</div>
                        <div className='admin-check-content-item__text'>{dataComp.payment.value}</div>
                    </div>
                </div>
                <div className='admin-check-content__right-side'>
                    <div className='admin-check-right-side-items'>
                        <CheckRightSideItemFragment />
                        <CheckRightSideItemFragment />
                    </div>
                    <div className='admin-check-right-side-price'>
                        <div className='admin-check-right-side-price__result'>Итого</div>
                        <div className='admin-check-right-side-price__price'>{dataComp.resultPrice}</div>
                    </div>
                </div>
            </div>
            {isTransferAgreement && (
                <div className='check-agreement'>
                    <div className='check-agreement__title'>Заказ передан от компании №2</div>
                    <div className='check-agreement__buttons'>
                        <div
                            className='check-agreement__button check-agreement__button_agree'
                            onClick={() => agreementHandler()}
                        >
                            Принять
                        </div>
                        <div className='check-agreement__button check-agreement__button_disagree'>Отклонить</div>
                    </div>
                </div>
            )}
            <div className={isTransferAgreement ? 'disabled-elem' : ''}>
                <div className='admin-check-layout-modern-title admin-check-layout-title_margin-top'>
                    <div className='admin-check-layout-title'>
                        Модерирование заказа
                    </div>
                    <TransferSelectFragment data={{ value: 'Ресторан №2' }} transferHandler={transferHandler} />
                </div>
                <CheckActivityFragment isTransferred={isTransferred} />
                <div className='admin-check-layout-button'>Завершить работу с заказом</div>
            </div>
        </AdminPageFragment>
    );
};
