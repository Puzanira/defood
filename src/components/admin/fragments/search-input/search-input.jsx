import React, { useReducer } from 'react';
import SearchBar from 'material-ui-search-bar';

import { SearchFilterListFragment } from '../search-filter-list';
import './search-input.css';


/**
 * Search-input fragment
 * @return {jsx}
 */
export const SearchInputFragment = ({ data }) => {
    const searchFilters = [
        {
            id: 'Статус',
            array: [
                { value: '0', text: 'Статус' },
                { value: '1', text: 'Принят' },
                { value: '2', text: 'Готов' },
                { value: '3', text: 'В пути' },
                { value: '4', text: 'Завершен' },
            ],
        },
        {
            id: 'Стоимость',
            array: [
                { value: '0', text: 'Стоимость' },
                { value: '1', text: 'По возрастанию' },
                { value: '2', text: 'По убыванию' },
            ],
        },
        {
            id: 'Время',
            array: [
                { value: '0', text: 'Время' },
                { value: '1', text: 'Ближайшие' },
                { value: '2', text: 'Давнейшие' },
            ],
        },
    ];

    const initialState = {
        dataComp: data,

        searchFiltersTexts: searchFilters,
        isOpenFilters: false,
        filtersState: searchFilters.reduce((acc, elem) => {
            acc[elem.id] = 0;
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
        dataComp,
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
                    {searchFiltersTexts.map((item, index) => (
                        <SearchFilterListFragment
                            data={item.array}
                            changeFilterField={changeFilterField}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
