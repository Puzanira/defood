import React, {useReducer} from 'react';

import './admin-page.css';
import HeaderFragment from '../header/header';

/**
 * Heare fragment
 * @return {jsx}
 */
function AdminPageFragment(props) {
    const data = [];
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
        <div className="admin-page">
            <HeaderFragment/>
            <div className="admin-page__content">
                {props.children}
            </div>
        </div>
    );
}

export default AdminPageFragment;
