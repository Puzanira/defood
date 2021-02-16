import React, { useEffect } from 'react';

import { Page } from '../../fragments/page';
import { ListItems } from '../../fragments/list-items';
import { useSelector } from 'react-redux';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';

import './list-layout.css';


export const ListLayout = () => {
    const data = useSelector(state => state.client.items);

    const getItems = useAction(
        () => clientActions.getItems(),
        [],
    );

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Page>
            <div className='list-title'>Пицца</div>
            <ListItems items={data} />
        </Page>
    );
};

