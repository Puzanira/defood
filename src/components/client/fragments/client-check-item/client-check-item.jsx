import React from 'react';

import { CheckOrder } from '../check-order';
import { DealHistory } from '../../../../core/deals/components/DealHistory';
import { statusMap, statusMessageMap } from '../../../../state/orders/types/orders/statusMap';
import './client-check-item.css';


export const ClientCheckItem = ({ data, localDealId, id }) => (
    <div className='client-check-item'>
        <div className='check-title'>Заказ № {localDealId}</div>
        <div className='check-content'>
            <CheckOrder order={data} />
        </div>
        <DealHistory
            id={id}
            statusMap={statusMap}
            statusMessageMap={statusMessageMap}
        />
    </div>
);
