import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RouterStore } from '../../../../store/routes';
import { Page } from '../../fragments/page';
import { useSelector } from 'react-redux';
import { config } from '../../../../config';

import './pizza-list-layout.css';


export const PizzaListLayout = () => {
    const address = useSelector(state => state.client.address);

    const zones = Object.keys(config.zone).map((item, index) => {
        const time = address === item ? '30 мин' : '2 часа';
        console.log(time, address, item);

        return (
            <Link key={index} to={RouterStore.website.pizza.replace(':slug', item)} className='pizza-item'>
                <div className='pizza-item__placeholder'>
                    <div className='pizza-item__wait-time'>{ time }</div>
                </div>
                <div className='pizza-item__bottom'>
                    <div className='pizza-item__title'>{ item }</div>
                </div>
            </Link>
        );
    });

    return (
        <Page>
            <div className='list-title'>Пицца</div>
            <div className='pizza-list'>
                { zones }
            </div>
        </Page>
    );
};
