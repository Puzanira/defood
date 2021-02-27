import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../fragments/admin-page';
import { CheckRightSideItemFragment } from '../../fragments/check-right-side-item';
import { CheckActivityFragment } from '../../fragments/check-activity';
import { NODE_CONFIG } from '../../../../config';
import './check-admin-layout.css';


/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
    const { id } = useParams();
    const updateOrder = useAction(
        () => adminActions.getOrder({ id }),
        [id],
    );

    const busy = useSelector(({ admin }) => admin.busy);
    const currentOrder = useSelector(({ admin }) => admin.currentOrder);
    const currentAction = useSelector(({ admin }) => admin.currentAction);

    const updateStatus = useAction(
        () => adminActions.updateNextStatus(),
        [],
    );

    useEffect(() => {
        updateOrder();
    }, []);

    return (
        <AdminPageFragment headerData={NODE_CONFIG}>
            {currentOrder && currentOrder.parameters && (
                <div>
                    <div className='admin-check-layout-title admin-check-layout-title_margin-bottom'>
                        Заказ № {currentOrder.localDealId}
                    </div>
                    <div className='admin-check-content'>
                        <div className='admin-check-content__left-side'>
                            {currentOrder.parameters.type === 'InitialOrder' ? (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Адрес</div>
                                    <div className='admin-check-content-item__text'>{currentOrder.parameters.addressTo}</div>
                                </div>
                            ) : (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Исполняется</div>
                                    <div className='admin-check-content-item__text'>{currentOrder.parameters.baker}</div>
                                </div>
                            )}
                            {currentOrder.parameters.clientContacts && (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Клиент</div>
                                    <div className='admin-check-content-item__text'>{`${currentOrder.parameters.clientContacts.name}, тел. ${currentOrder.parameters.clientContacts.tel}`}</div>
                                </div>
                            )}
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Доставщик</div>
                                <div className='admin-check-content-item__text'>
                                    Delivery Cub
                                </div>
                            </div>
                        </div>
                        <div className='admin-check-content__right-side'>
                            <div className='admin-check-right-side-items'>
                                {currentOrder.parameters.orderData &&
                                currentOrder.parameters.orderData.map((elem, index) => (
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
                        {currentOrder.status && currentAction && currentAction.transferAction && currentOrder.status !== 'closed' ? (
                            <>
                                <div className='check-agreement__title'>Текущий статус: {currentOrder.status}</div>
                                <div className='check-agreement__title'>{currentAction.textMessage}</div>
                                {currentAction.transferAction === 'wait' && (
                                    <CircularProgress />
                                )}
                                { currentAction.transferAction === 'update' && (
                                    <div className='check-agreement__buttons'>
                                        {busy ? (
                                            <CircularProgress />
                                        ) : (
                                            <div
                                                className='check-agreement__button check-agreement__button_agree'
                                                onClick={updateStatus}
                                            >
                                                Ок
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {currentOrder.status === 'Closed' ? (
                                    <div className='check-agreement__title'>Текущий статус: Заказ закрыт</div>
                                ) : (
                                    <div className='check-agreement__title'>Текущий статус: Заказ создан, обрабатывается платформой</div>
                                )}
                            </>
                        )}
                    </div>
                    <CheckActivityFragment history={currentOrder.history} />
                </div>
            )}
        </AdminPageFragment>
    );
};
