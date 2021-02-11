import React, {useReducer} from 'react';

import './header.css';
import {Link} from 'react-router-dom';

/**
 * Header fragment
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
        <div className="header-admin-container">
            <div className="header-admin">
                <Link to={'/admin/index'} className="header-admin__logo">DePi Admin</Link>
                <div className="header-admin__links">
                    <Link to={'/admin/index'} className="header-admin__link">Заказы</Link>
                    <div className="header-admin__link">Профиль</div>
                </div>
            </div>
        </div>
    );
}

export default HeaderFragment;
