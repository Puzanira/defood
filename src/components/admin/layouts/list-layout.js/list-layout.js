import React, { useReducer } from 'react';

import ListPartFragment from '../../fragments/list-part/list-part';
import HeaderFragment from '../../fragments/header/header';

import './list-layout.css';
import SearchInputFragment from '../../fragments/search-input/search-input';

/**
 * List layout
 */
function ListLayout() {
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
        <div className="list-layout">
            <HeaderFragment />
            <div className="list-layout-content list-layout_margin">
                <div className="list-layout-content__title list-layout-content_margin-bottom">
                    Реестр заказов
                </div>
                <SearchInputFragment />
                <ListPartFragment />
            </div>
        </div>
    );
}

export default ListLayout;
