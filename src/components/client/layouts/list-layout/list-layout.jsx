import React from 'react';

import { Page } from '../../fragments/page';
import { ListItems } from '../../fragments/list-items';

import './list-layout.css';


export const ListLayout = () => (
    <Page>
        <div className='list-title'>Пицца</div>
        <ListItems />
    </Page>
);

