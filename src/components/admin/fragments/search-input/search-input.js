import React, {useReducer} from 'react';

import './search-input.css';

import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';
import SearchFilterListFragment from '../../fragments/search-filter-list/search-filter-list';

/**
 * Search-input fragment
 * @return {jsx}
 */
function SearchInputFragment({data}) {
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
        <div className="search-input">
            <div className="search-input__line">
                <SearchBar placeholder='Поиск' className='search-bar'/>
                <div className="search-input__filters-btn">
                    Фильтры
                </div>
                {/* <Button variant="outlined" className="search-input__filters-btn">Default</Button> */}
            </div>
            <div className="search-input__filters">
                <SearchFilterListFragment />
            </div>
        </div>
    );
}

export default SearchInputFragment;
