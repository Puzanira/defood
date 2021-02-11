import React, {useReducer} from 'react';

import './transfer-select.css';

/**
 * Transfer select fragment
 * @return {jsx}
 */
function TransferSelectFragment({data, transferHandler}) {
    const initialState = {
        dataComp: data,
    };

    const changeField = (field, value) => {
        dispatch({type: 'CHANGE_FIELD', field, value});
    };

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return {...state, [action.field]: action.value};
                default:
                    return state;
            }
        },
        initialState
    );

    const {
        dataComp,
    } = state;

    return (
        <div className="transfer-select" onClick={() => transferHandler()}>
            <div className="transfer-select__left-part">Передать на исполнение</div>
            <div className="transfer-select__right-part">{dataComp.value}</div>
        </div>
    );
}

export default TransferSelectFragment;
