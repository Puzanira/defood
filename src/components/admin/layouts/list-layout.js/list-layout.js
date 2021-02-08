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
    const data =  [
        {
            title: 'Заказ №1212121',
            lable: 'Принят',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '950 ₽'
        },
        {
            title: 'Заказ №1212134',
            lable: 'В пути',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            title: 'Заказ №1212140',
            lable: 'Завершен',
            content: 'Пицца “Бавария” 25 см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '450 ₽'
        },
    ];
    
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
        <AdminPageFragment>
            <div className="list-layout-content__title list-layout-content_margin-bottom">
                Реестр заказов
            </div>
            <SearchInputFragment />
            {dataComp.map(item => (
                <ListPartFragment data={item}/>
            ))}
        </AdminPageFragment>
    );
}

export default AdminListLayout;
