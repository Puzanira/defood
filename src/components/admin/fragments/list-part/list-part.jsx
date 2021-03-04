import React from 'react';
import { useHistory } from 'react-router-dom';

import { RouterStore } from '../../../../store/routes';
import { statusMessageMap } from '../../../../state/orders/types/orders/statusMap';
import { deals } from '../../../../core/deals/constants';
import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
export const ListPartFragment = ({ data, pageType }) => {
    const history = useHistory();

    const labelColor = {
        NEW: 'list-part-left__label_green',
        payment: 'list-part-left__label_dark-green',
        baking: 'list-part-left__label_orange',
        baked: 'list-part-left__label_dark-orange',
        delivering: 'list-part-left__label_blue',
        delivered: 'list-part-left__label_dark-blue',
        Closed: 'list-part-left__label_purple',
    };

    const transferredColor = {
        'Переведен в КС': 'list-part_dark-purple',
        'Ожидает перевода': 'list-part_purple',
    };

    const routToOrderHandler = () => {
        history.push(`${RouterStore[pageType].order.replace(':id', data.localDealId)}`);
    };

    const fullStatusMessageMap = {
        ...statusMessageMap,
        ...deals.platformStatusMessages,
    };

    return (
        <div className={`list-part ${transferredColor[data.label]}`} onClick={() => routToOrderHandler()}>
            <div className='list-part-left'>
                <div className='list-part-left__title'>
                    Заказ № {data.localDealId}
                </div>
                <div className={`list-part-left__label ${labelColor[data.status]}`}>
                    {fullStatusMessageMap[data.status]}
                </div>
            </div>
            {/* <div className='list-part-middle'> */}
            {/*    <div className='list-part-middle__text list-part-middle_margin-bottom'> */}
            {/*        {data.content} */}
            {/*    </div> */}
            {/*    <div className='list-part-middle__text'> */}
            {/*        {data.home} */}
            {/*    </div> */}
            {/* </div> */}
            {/* <div className='list-part-right'> */}
            {/*    {data.cost} */}
            {/* </div> */}
        </div>
    );
};
