import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
export const ListPartFragment = ({ data }) => {
    const history = useHistory();

    const labelColor = {
        created: 'list-part-left__label_green',
        accepting: 'list-part-left__label_dark-green',
        payment: 'list-part-left__label_orange',
        processing: 'list-part-left__label_dark-orange',
        transferringToPizza: 'list-part-left__label_blue',
        deliveryAgreement: 'list-part-left__label_dark-blue',
        baking: 'list-part-left__label_gray',

        transferredToDelivery: 'list-part-left__label_dark-purple',
        closed: 'list-part-left__label_purple',
    };

    const transferredColor = {
        'Переведен в КС': 'list-part_dark-purple',
        'Ожидает перевода': 'list-part_purple',
    };

    const routToOrderHandler = () => {
        history.push(`/admin/check/${data.localDealId}`);
    };

    return (
        <div className={`list-part ${transferredColor[data.label]}`} onClick={() => routToOrderHandler()}>
            <div className='list-part-left'>
                <div className='list-part-left__title'>
                    Заказ № {data.localDealId}
                </div>
                <div className={`list-part-left__label ${labelColor[data.status]}`}>
                    {data.status}
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
