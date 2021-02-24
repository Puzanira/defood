import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ListPartFragment } from '../../../admin/fragments/list-part';
import { AdminPageFragment } from '../../../admin/fragments/admin-page';
import { useAction } from '../../../../utils';
import '../../../admin/layouts/list-layout/list-layout.css';
import { deliveryActions } from '../../../../state/delivery/actions';
import { NODE_CONFIG } from '../../../../config';


/**
 * Delivery ist layout
 */
export const DeliveryListLayout = () => {
    const data = useSelector(state => state.delivery.orders);

    const getOrders = useAction(
        () => deliveryActions.getOrders(),
        [],
    );

    useEffect(() => {
        if (!data.length)
            getOrders();
    }, [data, getOrders]);

    return (
        <AdminPageFragment headerData={NODE_CONFIG}>
            <div className='list-layout-content__title list-layout-content_margin-bottom'>
                Реестр заказов
            </div>
            {data.map((item, index) => (
                <ListPartFragment data={item} pageType='delivery' key={index} />
            ))}
        </AdminPageFragment>
    );
};
