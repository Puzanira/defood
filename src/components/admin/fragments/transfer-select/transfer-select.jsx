import React from 'react';

import './transfer-select.css';

/**
 * Transfer select fragment
 * @return {jsx}
 */
export const TransferSelectFragment = ({ data: { value }, transferHandler }) => (
    <div className='transfer-select' onClick={() => transferHandler()}>
        <div className='transfer-select__left-part'>Передать на исполнение</div>
        <div className='transfer-select__right-part'>{value}</div>
    </div>
);
