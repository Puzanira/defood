import React, { useReducer, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';

import { AdminPageFragment } from '../../fragments/admin-page';
import { CheckRightSideItemFragment } from '../../fragments/check-right-side-item';
import { CheckActivityFragment } from '../../fragments/check-activity';
import { TransferSelectFragment } from '../../fragments/transfer-select';

import './check-admin-layout.css';


/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
    const dataComp = useSelector(state => state.admin.checkData.data);
    const isTransferred = useSelector(state => state.admin.checkData.isTransferred);
    const isTransferAgreement = useSelector(state => state.admin.checkData.isTransferAgreement);

    const getCheckData = useAction(
        () => adminActions.getCheckData(),
        [],
    );

    const transferHandler = useAction(
        () => adminActions.setIsTransferredData({ isTransferred: !isTransferred }),
        [],
    );

    const agreementHandler = useAction(
        () => adminActions.setIsTransferAgreementData({ agreement: false }),
        [],
    );

    useEffect(() => {
        // console.log(dataComp);
        getCheckData();
    }, []);

    return (
        <AdminPageFragment>
            {dataComp.title && (
                <div>
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
                                    onClick={agreementHandler}
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
                        <CheckActivityFragment />
                        <div className='admin-check-layout-button'>Завершить работу с заказом</div>
                    </div>
                </div>
            )}
        </AdminPageFragment>
    );
};
