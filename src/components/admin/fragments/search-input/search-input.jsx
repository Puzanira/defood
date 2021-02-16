import React, { useReducer } from 'react';
import SearchBar from 'material-ui-search-bar';

import { SearchFilterListFragment } from '../search-filter-list';
import './search-input.css';
import { searchFilters } from '../../../../store/admin-mock-data';


/**
 * Search-input fragment
 * @return {jsx}
 */
export const SearchInputFragment = () => {
    const initialState = {
        searchFiltersTexts: searchFilters,
        isOpenFilters: false,
        filtersState: Object.keys(searchFilters).reduce((acc, elem) => {
            acc[elem] = 0;
            return acc;
        }, {}),

        searchBarValue: '',
    };

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return { ...state, [action.field]: action.value };
                case 'CHANGE_FILTER_FIELD':
                    return {
                        ...state,
                        filtersState: { ...state.filtersState, [action.field]: action.value },
                    };
                default:
                    return state;
            }
        },
        initialState,
    );

    const changeField = (field, value) => {
        dispatch({ type: 'CHANGE_FIELD', field, value });
    };

    const changeFilterField = (field, value) => {
        dispatch({ type: 'CHANGE_FILTER_FIELD', field, value });
    };

    const {
        searchFiltersTexts,
        isOpenFilters,
        filtersState,
        searchBarValue,
    } = state;

    const changeFiltersHandler = () => {
        if (isOpenFilters) {
            changeField('isOpenFilters', false);
            Object.keys(filtersState).forEach(elem => {
                changeFilterField(elem, 0);
            });
        } else
            changeField('isOpenFilters', true);
    };

    return (
        <div className='search-input'>
            <div className='search-input__line'>
                <SearchBar
                    placeholder='Поиск'
                    className='search-bar'
                    value={searchBarValue}
                    onChange={value => changeField('searchBarValue', value)}
                    onCancelSearch={value => changeField('searchBarValue', '')}
                />
                <div className='search-input__filters-btn' onClick={() => changeFiltersHandler()}>
                    Фильтры
                </div>
            </div>
            {isOpenFilters && (
                <div className='search-input__filters'>
                    {Object.keys(searchFiltersTexts).map((item, index) => (
                        <SearchFilterListFragment
                            data={searchFiltersTexts[item]}
                            changeFilterField={changeFilterField}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
