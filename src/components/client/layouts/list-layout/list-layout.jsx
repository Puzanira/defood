import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Page } from '../../fragments/page';
import { ListItems } from '../../fragments/list-items';
import { getDeliveryTime, useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { config, NODE, NODE_CONFIG } from '../../../../config';
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
        /* eslint react-hooks/exhaustive-deps: 0 */
    }, []);

    const currentPizza = NODE;
    const currentPizzaName = NODE_CONFIG.name;
    const friendPizzaName = NODE === 'PIZZA1'
        ? config.parties.PIZZA2.name : config.parties.PIZZA1.name;
    const isPizza = Object.keys(config.zone).indexOf(currentPizza);
    const time = getDeliveryTime(address, currentPizza);

    const pizzaArray = useMemo(
        () => Object
            .keys(config.zone)
            .filter(item => item !== currentPizza)
            .map((item, index) => {
                const time = getDeliveryTime(address, item);
                return (
                    <div key={index} className='list-item'>
                        <div className='list-title'>
                            Меню дружественной {friendPizzaName} <span className='list-time'>{ time }</span>
                        </div>
                        <ListItems key={index} items={data.filter(obj => obj.baker === item)} />
                    </div>
                );
            }),
        [address, currentPizza, data],
    );

    return isPizza !== -1 ? (
        <Page>
            <div className='list-item'>
                <div className='list-title'>Меню { currentPizzaName } <span className='list-time'>{ time }</span></div>
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

