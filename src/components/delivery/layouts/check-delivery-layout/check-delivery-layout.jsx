import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../../admin/fragments/admin-page';
import { DealManager } from '../../../../core/deals/components/DealManager';
import '../../../admin/layouts/check-admin-layout/check-admin-layout.css';
import { NODE_CONFIG } from '../../../../config';
import { getOrderTransitions } from '../../../../state/orders/types/helpers';


/**
 * Check Delivery layout
 */
export const CheckDeliveryLayout = () => {
    const { id } = useParams();
    const currentOrder = useSelector(({ admin }) => admin.currentOrder);
    const transferParameters = useMemo(
        () => getOrderTransitions(currentOrder),
        [currentOrder],
    );

    const getOrder = useAction(
        () => adminActions.getOrder({ id }),
        [id],
    );

    const onSuccessCallback = useAction(
        order => adminActions.updateOrder({ order }),
        [],
    );

    useEffect(() => {
        getOrder();
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
                            {currentOrder.parameters.clientContacts && (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Клиент</div>
                                    <div className='admin-check-content-item__text'>{`${currentOrder.parameters.clientContacts.name}, тел. ${currentOrder.parameters.clientContacts.tel}`}</div>
                                </div>
                            )}
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Оплата</div>
                                <div className='admin-check-content-item__text'>произведена</div>
                            </div>
                        </div>
                    </div>
                    {transferParameters && (
                        <DealManager
                            id={id}
                            currentStatus={currentOrder.status}
                            transferParameters={transferParameters}
                            actionCallback={onSuccessCallback}
                        />
                    )}
                </div>
            )}
        </AdminPageFragment>
    );
};
