import React, {useReducer} from 'react';

import './search-filter-list.css';

/**
 * Search-filter fragment
 * @return {jsx}
 */
function SearchFilterListFragment({data, changeFilterField}) {
    const initialState = {
        selectData: data,
        value: data[0].value,
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
        selectData,
        value,
    } = state;

    const changeSelectValue = (value) => {
        changeField('value', Number(value));
        changeFilterField(data[0].text, Number(value));
    }

    return (
        <select className="search-filter-select"
            onChange={(e) => changeSelectValue(e.target.value)}
            value={value}>
            {selectData.map((item, index) => (
                <option className="search-filter-select__item" value={item.value} key={index}>{item.text}</option>
            ))}
        </select>
    );
}

export default SearchFilterListFragment;
