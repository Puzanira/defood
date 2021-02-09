import React, { useReducer } from 'react';

import './check-admin-layout.css';
import AdminPageFragment from '../../fragments/admin-page/admin-page';
import CheckRightSideItemFragment from '../../fragments/check-right-side-item/check-right-side-item';
import CheckActivityFragment from '../../fragments/check-activity/check-activity';

/**
 * List layout
 */
function CheckAdminLayout() {
    const data =  {
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
    };

    const changeField = (field, value) => {
        dispatch({type: 'CHANGE_FIELD', field, value});
    };

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return {...state, [action.field]: action.value};
                default:
                    return state;
            }
        },
        initialState
    );

    const {
        dataComp,
    } = state;

    const classs = {
        background: 'black',
    }

    return (
        <AdminPageFragment>
            <div className="admin-check-layout-title admin-check-layout-title_margin-bottom">
                {dataComp.title}
            </div>
            <div className="admin-check-content">
                <div className="admin-check-content__left-side">
                    <div className="admin-check-content-item">
                        <div className="admin-check-content-item__title">{dataComp.address.title}</div>
                        <div className="admin-check-content-item__text">{dataComp.address.value}</div>
                    </div>
                    <div className="admin-check-content-item">
                        <div className="admin-check-content-item__title">{dataComp.recipient.title}</div>
                        <div className="admin-check-content-item__text">{dataComp.recipient.value}</div>
                    </div>
                    <div className="admin-check-content-item">
                        <div className="admin-check-content-item__title">{dataComp.processingTime.title}</div>
                        <div className="admin-check-content-item__text">{dataComp.processingTime.value}</div>
                    </div>
                    <div className="admin-check-content-item">
                        <div className="admin-check-content-item__title">{dataComp.payment.title}</div>
                        <div className="admin-check-content-item__text">{dataComp.payment.value}</div>
                    </div>
                </div>
                <div className="admin-check-content__right-side">
                    <div className="admin-check-right-side-items">
                        <CheckRightSideItemFragment/>
                        <CheckRightSideItemFragment/>
                    </div>
                    <div className="admin-check-right-side-price">
                        <div className="admin-check-right-side-price__result">Итого</div>
                        <div className="admin-check-right-side-price__price">{dataComp.resultPrice}</div>
                    </div>
                </div>
            </div>
            <div className="admin-check-layout-modern-title admin-check-layout-title_margin-top">
                <div className="admin-check-layout-title">
                    Модерирование заказа
                </div>
            </div>
            <CheckActivityFragment/>
            <div className="admin-check-layout-button">Завершить работу с заказом</div>
        </AdminPageFragment>
    );
}

export default CheckAdminLayout;
