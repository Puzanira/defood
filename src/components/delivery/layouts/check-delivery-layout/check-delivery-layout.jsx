import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useAction } from '../../../../utils';
import { deliveryActions } from '../../../../state/delivery/actions';
import { AdminPageFragment } from '../../../admin/fragments/admin-page';
import { CheckRightSideItemFragment } from '../../../admin/fragments/check-right-side-item';
import { CheckActivityFragment } from '../../../admin/fragments/check-activity';
import { deliveryStatusMap } from '../../../../state/admin/deals';
import { headerData } from '../../../../store/admin-mock-data';
import '../../../admin/layouts/check-admin-layout/check-admin-layout.css';


/**
 * Check Delivery layout
 */
export const CheckDeliveryLayout = () => {
    const { id } = useParams();

    const currentOrder = useSelector(({ delivery }) => delivery.currentOrder);

    const getData = useAction(
        () => deliveryActions.getOrder({ id }),
        [id],
    );

    const updateStatus = useAction(
        actionType => deliveryActions.updateNextStatus({ actionType }),
        [],
    );

    useEffect(() => {
        if (!(currentOrder && currentOrder.parameters))
            getData();
    }, [currentOrder, getData, id]);

    return (
        <AdminPageFragment headerData={headerData.delivery}>
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
                                <div className='admin-check-content-item__text'>{currentOrder.parameters.clientContacts}</div>
                            </div>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Адрес отправителя</div>
                                <div className='admin-check-content-item__text'>{currentOrder.parameters.addressFrom}</div>
                            </div>
                            <div className='admin-check-content-item'>
                                <div className='admin-check-content-item__title'>Оплата</div>
                                <div className='admin-check-content-item__text'>произведена</div>
                            </div>
                        </div>
                    </div>
                    <div className='check-agreement'>
                        {currentOrder.status ? (
                            <>
                                <div className='check-agreement__title'>Текущий статус: {currentOrder.status}</div>
                                <div className='check-agreement__buttons'>
                                    {deliveryStatusMap[currentOrder.status].next && deliveryStatusMap[currentOrder.status].next.onReject ? (
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
