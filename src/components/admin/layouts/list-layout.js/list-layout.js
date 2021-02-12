import React from 'react';

import ListPartFragment from '../../fragments/list-part/list-part';

import './list-layout.css';
import SearchInputFragment from '../../fragments/search-input/search-input';
import AdminPageFragment from '../../fragments/admin-page/admin-page';

/**
 * List layout
 */
function ListAdminLayout() {
    const data =  [
        {
            number: '111',
            title: 'Заказ №1212121',
            lable: 'Создан',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '950 ₽'
        },
        {
            number: '112',
            title: 'Заказ №1212134',
            lable: 'Обрабатывается',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '113',
            title: 'Заказ №1212134',
            lable: 'Готовится',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '114',
            title: 'Заказ №1212134',
            lable: 'Готов',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '115',
            title: 'Заказ №1212134',
            lable: 'В пути',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '116',
            title: 'Заказ №1212134',
            lable: 'Доставлен',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '117',
            title: 'Заказ №1212140',
            lable: 'Закрыт',
            content: 'Пицца “Бавария” 25 см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '450 ₽'
        },
        {
            number: '118',
            title: 'Заказ №1212134',
            lable: 'Переведен в КС',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
        {
            number: '119',
            title: 'Заказ №1212134',
            lable: 'Ожидает перевода',
            content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
            home: 'Москва, ул. Юных Ленинцев 12/17 к1',
            cost: '1150 ₽'
        },
    ];

    return (
        <AdminPageFragment>
            <div className="list-layout-content__title list-layout-content_margin-bottom">
                Реестр заказов
            </div>
            <SearchInputFragment />
            {data.map((item, index) => (
                <ListPartFragment data={item} key={index}/>
            ))}
        </AdminPageFragment>
    );
}

export default ListAdminLayout;
