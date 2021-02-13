import React from 'react';

import { ListPartFragment } from '../../fragments/list-part';
import { SearchInputFragment } from '../../fragments/search-input';
import { AdminPageFragment } from '../../fragments/admin-page';
import { data } from '../../../../store/admin-mock-data';
import './list-layout.css';


/**
 * List layout
 */
export const ListLayout = () => (
    <AdminPageFragment>
        <div className='list-layout-content__title list-layout-content_margin-bottom'>
            Реестр заказов
        </div>
        <SearchInputFragment />
        {data.map((item, index) => (
            <ListPartFragment data={item} key={index} />
        ))}
    </AdminPageFragment>
);
