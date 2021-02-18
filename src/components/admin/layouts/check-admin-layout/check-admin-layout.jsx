import React, { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../fragments/admin-page';
import { CheckRightSideItemFragment } from '../../fragments/check-right-side-item';
import { CheckActivityFragment } from '../../fragments/check-activity';
import { orderStatusMap } from '../../../../state/admin/deals';
import { headerData } from '../../../../store/admin-mock-data';
import './check-admin-layout.css';


/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
    const { id } = useParams();

    const currentOrder = useSelector(({ admin }) => admin.currentOrder);

    const getData = useAction(
        () => adminActions.getOrder({ id }),
        [id],
    );

    const updateStatus = useAction(
        actionType => adminActions.updateNextStatus({ actionType }),
        [],
    );

    useEffect(() => {
        if (!(currentOrder && currentOrder.parameters))
            getData();
    }, [currentOrder, getData, id]);

    return (
        <AdminPageFragment headerData={headerData.depi1}>
            {currentOrder && currentOrder.parameters && (
                <div>
                    <div className='admin-check-layout-title admin-check-layout-title_margin-bottom'>
                        Заказ № {currentOrder.localDealId}
                    </div>
                    <div className='admin-check-content'>
                        <div className='admin-check-content__left-side'>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Адрес</div>
                                <div className='admin-check-content-item__text'>{currentOrder.parameters.clientContacts.addressTo}</div>
                            </div>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Клиент</div>
                                <div className='admin-check-content-item__text'>{`${currentOrder.parameters.clientContacts.name}, ${currentOrder.parameters.clientContacts.tel}`}</div>
                            </div>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Оплата</div>
                                <div className='admin-check-content-item__text'>произведена</div>
                            </div>
                        </div>
                        <div className='admin-check-content__right-side'>
                            <div className='admin-check-right-side-items'>
                                {currentOrder.parameters.orderData.map((elem, index) => (
                                    <CheckRightSideItemFragment data={elem} key={index} />
                                ))}
                            </div>
                            <div className='admin-check-right-side-price'>
                                <div className='admin-check-right-side-price__result'>Итого</div>
                                <div className='admin-check-right-side-price__price'>{currentOrder.parameters.total}</div>
                            </div>
                        </div>
                    </div>
                    <div className='check-agreement'>
                        {currentOrder.status ? (
                            <>
                                <div className='check-agreement__title'>Текущий статус: {currentOrder.status}</div>
                                <div className='check-agreement__buttons'>
                                    {orderStatusMap[currentOrder.status].next.onReject ? (
                                        <>
                                            <div
                                                className='check-agreement__button check-agreement__button_agree'
                                                onClick={() => updateStatus('onSuccess')}
                                            >
                                                Принять
                                            </div>
                                            <div
                                                className='check-agreement__button check-agreement__button_disagree'
                                                onClick={() => updateStatus('onReject')}
                                            >
                                                Отклонить
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            className='check-agreement__button check-agreement__button_agree'
                                            onClick={() => updateStatus('onSuccess')}
                                        >
                                            Далее
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='check-agreement__title'>Текущий статус: Заказ закрыт</div>
                                <div className='admin-check-layout-button'>Завершить работу с заказом</div>
                            </>
                        )}

                    </div>
                    <CheckActivityFragment history={currentOrder.history} />
                </div>
            )}
        </AdminPageFragment>
    );
};
