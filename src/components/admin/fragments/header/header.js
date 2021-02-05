import React, {useReducer} from 'react';

import './header.css';

/**
 * Heare fragment
 * @return {jsx}
 */
function HeaderFragment({data}) {
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
        <div className="header">
        </div>
    );
}

export default HeaderFragment;
