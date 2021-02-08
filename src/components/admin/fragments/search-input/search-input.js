import React, {useReducer} from 'react';

import './search-input.css';

import SearchBar from 'material-ui-search-bar';
import SearchFilterListFragment from '../../fragments/search-filter-list/search-filter-list';

/**
 * Search-input fragment
 * @return {jsx}
 */
function SearchInputFragment({data}) {
    const searchFilters = [
        [{value: '0', text: 'Статус'}, {value: '1', text: 'Принят'}, {value: '2', text: 'Готов'}, {value: '3', text: 'В пути'}, {value: '4', text: 'Завершен'}],
        [{value: '0', text: 'Стоимость'}, {value: '1', text: 'По возрастанию'}, {value: '2', text: 'По убыванию'}],
        [{value: '0', text: 'Время'}, {value: '1', text: 'Ближайшие'}, {value: '2', text: 'Давнейшие'}],
    ];

    const initialState = {
        dataComp: data,
        searchFiltersTexts: searchFilters,
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
        searchFiltersTexts,
    } = state;

    return (
        <div className="search-input">
            <div className="search-input__line">
                <SearchBar placeholder='Поиск' className='search-bar'/>
                <div className="search-input__filters-btn">
                    Фильтры
                </div>
            </div>
            <div className="search-input__filters">
                {searchFiltersTexts.map(item => (
                    <SearchFilterListFragment data={item}/>
                ))}
            </div>
        </div>
    );
}

export default SearchInputFragment;
