import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ListPartFragment } from '../../fragments/list-part';
import { SearchInputFragment } from '../../fragments/search-input';
import { AdminPageFragment } from '../../fragments/admin-page';
import { adminActions } from '../../../../state/admin/actions';
import { useAction } from '../../../../utils';
import { NODE_CONFIG } from '../../../../config';
import './list-layout.css';


/**
 * List layout
 */
export const ListLayout = () => {
    const data = useSelector(state => state.admin.orders);

    const getOrders = useAction(
        () => adminActions.getOrders(),
        [],
    );

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <AdminPageFragment headerData={NODE_CONFIG}>
            <div className='list-layout-content__title list-layout-content_margin-bottom'>
                Реестр заказов
            </div>
            <SearchInputFragment />
            {data.map((item, index) => (
                <ListPartFragment data={item} pageType='admin' key={index} />
            ))}
        </AdminPageFragment>
    );
};
