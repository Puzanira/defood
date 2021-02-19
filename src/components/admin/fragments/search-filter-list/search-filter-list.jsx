import React, { useReducer } from 'react';

import './search-filter-list.css';

/**
 * Search-filter fragment
 * @return {jsx}
 */
export const SearchFilterListFragment = ({ data, item, changeFilterField }) => {
    const initialState = {
        selectData: data,
        value: data[0],
    };

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return { ...state, [action.field]: action.value };
                default:
                    return state;
            }
        },
        initialState,
    );

    const changeField = (field, value) => {
        dispatch({ type: 'CHANGE_FIELD', field, value });
    };

    const {
        selectData,
        value,
    } = state;

    const changeSelectValue = value => {
        changeField('value', value);
        changeFilterField(item, value);
    };

    return (
        <select
            className='search-filter-select'
            onChange={e => changeSelectValue(e.target.value)}
            value={value}
        >
            {selectData.map((item, index) => (
                <option className='search-filter-select__item' value={item} key={index}>{item}</option>
            ))}
        </select>
    );
};
