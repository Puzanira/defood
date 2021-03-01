import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../fragments/admin-page';
import { CheckRightSideItemFragment } from '../../fragments/check-right-side-item';
import { DealManager } from '../../../../core/deals/components/DealManager';
import { NODE_CONFIG } from '../../../../config';

import './check-admin-layout.css';
import { getOrderTransitions } from '../../../../state/orders/types/helpers';

/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
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
                        {currentOrder.parameters.type === 'TransferOrder' && (
                            <div>
                                Передан на исполнение: {currentOrder.parameters.baker}
                            </div>
                        )}
                    </div>
                    <div className='admin-check-content'>
                        <div className='admin-check-content__left-side'>
                            {currentOrder.parameters.type === 'InitialOrder' && (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Адрес</div>
                                    <div className='admin-check-content-item__text'>{currentOrder.parameters.addressTo}</div>
                                </div>
                            )}
                            {currentOrder.parameters.clientContacts && (
                                <div className='admin-check-content-item'>
                                    <div className='admin-check-content-item__title'>Клиент</div>
                                    <div className='admin-check-content-item__text'>
                                        {`${currentOrder.parameters.clientContacts.name}, тел. 
                                        ${currentOrder.parameters.clientContacts.tel}`}
                                    </div>
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
                    {transferParameters && (
                        <DealManager
                            id={id}
                            currentStatus={currentOrder.status}
                            transferParameters={transferParameters}
                            callback={onSuccessCallback}
                        />
                    )}
                </div>
            )}
        </AdminPageFragment>
    );
};
