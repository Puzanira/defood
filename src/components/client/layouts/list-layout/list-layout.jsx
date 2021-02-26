import React, { useEffect } from 'react';

import { Page } from '../../fragments/page';
import { ListItems } from '../../fragments/list-items';
import { useSelector } from 'react-redux';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { config } from '../../../../config';

import './list-layout.css';


export const ListLayout = () => {
    const data = useSelector(state => state.client.items);
    const address = useSelector(state => state.client.address);
    const getItems = useAction(
        () => clientActions.getItems(),
        [],
    );

    useEffect(() => {
        getItems();
    }, []);

    const currentPizza = window.location.pathname.replace('/pizza/', '');
    const isPizza = Object.keys(config.zone).indexOf(currentPizza);
    const time = address === currentPizza ? '30 мин' : '2 часа';

    const pizzaArray = Object.keys(config.zone).filter(item => item !== currentPizza).map(item => {
        const time = address === item ? '30 мин' : '2 часа';
        return (
            <div className='list-item'>
                <div className='list-title'>Меню дружественной {item} <span className='list-time'>{ time }</span></div>
                <ListItems items={data.filter(obj => obj.baker === item)} />
            </div>
        );
    });

    return isPizza !== -1 ? (
        <Page>
            <div className='list-item'>
                <div className='list-title'>Меню { currentPizza } <span className='list-time'>{ time }</span></div>
                <ListItems items={data.filter(item => item.baker === currentPizza)} />
            </div>
            { pizzaArray }
        </Page>
    ) : (
        <Page>
            <div className='list-title'>Такой пиццерии не существует</div>
        </Page>
    );
};

