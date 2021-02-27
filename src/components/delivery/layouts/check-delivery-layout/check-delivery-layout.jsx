import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../../admin/fragments/admin-page';
import { CheckActivityFragment } from '../../../admin/fragments/check-activity';
import '../../../admin/layouts/check-admin-layout/check-admin-layout.css';
import { NODE_CONFIG } from '../../../../config';


/**
 * Check Delivery layout
 */
export const CheckDeliveryLayout = () => {
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
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Адрес доставки</div>
                                <div className='admin-check-content-item__text'>{currentOrder.parameters.addressTo}</div>
                            </div>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Клиент</div>
                                <div className='admin-check-content-item__text'>{`${currentOrder.parameters.clientContacts.name}, тел. ${currentOrder.parameters.clientContacts.tel}`}</div>
                            </div>
                            {/* <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Адрес отправителя</div>
                                <div className='admin-check-content-item__text'>{currentOrder.parameters.addressFrom}</div>
                            </div> */}
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Оплата</div>
                                <div className='admin-check-content-item__text'>произведена</div>
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
                                <div className='check-agreement__title'>Текущий статус: Заказ создан, обрабатывается платформой</div>
                            </>
                        )}
                    </div>
                    <CheckActivityFragment history={currentOrder.history} />
                </div>
            )}
        </AdminPageFragment>
    );
};
