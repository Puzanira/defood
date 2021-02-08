import React, { useReducer } from 'react';

import ListPartFragment from '../../fragments/list-part/list-part';
import HeaderFragment from '../../fragments/header/header';

import './list-layout.css';
import SearchInputFragment from '../../fragments/search-input/search-input';
import AdminPageFragment from '../../fragments/admin-page/admin-page';

/**
 * List layout
 */
function AdminListLayout() {
    const initialState = {
        dataComp: {},
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
        <AdminPageFragment>
            <div className="list-layout-content__title list-layout-content_margin-bottom">
                Реестр заказов
            </div>
            <SearchInputFragment />
            <ListPartFragment />
        </AdminPageFragment>
    );
}

export default AdminListLayout;
