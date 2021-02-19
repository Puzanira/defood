import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ListPartFragment } from '../../fragments/list-part';
import { SearchInputFragment } from '../../fragments/search-input';
import { AdminPageFragment } from '../../fragments/admin-page';
import { adminActions } from '../../../../state/admin/actions';
import { useAction } from '../../../../utils';
import { headerData } from '../../../../store/admin-mock-data';
import { config } from '../../../../config';
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
        if (!data.length)
            getOrders();
    }, [getOrders]);

    return (
        <AdminPageFragment headerData={headerData[config.nodeType]}>
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
