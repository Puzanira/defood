import React from 'react';

import './transfer-select.css';

/**
 * Transfer select fragment
 * @return {jsx}
 */
function TransferSelectFragment({data, transferHandler}) {
    return (
        <div className="transfer-select" onClick={() => transferHandler()}>
            <div className="transfer-select__left-part">Передать на исполнение</div>
            <div className="transfer-select__right-part">{data.value}</div>
        </div>
    );
}

export default TransferSelectFragment;
