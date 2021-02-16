export const data = [
    {
        number: '111',
        title: 'Заказ №1212121',
        label: 'Создан',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '950 ₽',
    },
    {
        number: '112',
        title: 'Заказ №1212134',
        label: 'Обрабатывается',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '113',
        title: 'Заказ №1212134',
        label: 'Готовится',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '114',
        title: 'Заказ №1212134',
        label: 'Готов',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '115',
        title: 'Заказ №1212134',
        label: 'В пути',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '116',
        title: 'Заказ №1212134',
        label: 'Доставлен',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '117',
        title: 'Заказ №1212140',
        label: 'Закрыт',
        content: 'Пицца “Бавария” 25 см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '450 ₽',
    },
    {
        number: '118',
        title: 'Заказ №1212134',
        label: 'Переведен в КС',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
    {
        number: '119',
        title: 'Заказ №1212134',
        label: 'Ожидает перевода',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара" 30смб пицца “Карбонара" 25см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '1150 ₽',
    },
];

export const checkData = {
    title: 'Заказ №1212121',
    address: {
        title: 'Доставка по адресу',
        value: 'Москва, ул. Юных Ленинцев 12/17 к1',
    },
    recipient: {
        title: 'Получатель',
        value: 'Ольга, +7 916 720 64 95',
    },
    processingTime: {
        title: 'Время оформления',
        value: '2 февраля 2021 17:00',
    },
    payment: {
        title: 'Оплата',
        value: 'Онлайн на сайте',
    },
    resultPrice: '950 ₽',
};

export const searchFilters = {
    Статус: {
        0: 'Статус',
        1: 'Принят',
        2: 'Готов',
        3: 'В пути',
        4: 'Завершен',
    },
    Стоимость: {
        0: 'Стоимость',
        1: 'По возрастанию',
        2: 'По убыванию',
    },
    Время: {
        0: 'Время',
        1: 'Ближайшие',
        2: 'Давнейшие',
    },
};

export const checkStatuses = {
    valuesOfStatuses: {
        'Создан': { id: 1, isSelected: false, isAvailable: true },
        'Обрабатывается': { id: 2, isSelected: false, isAvailable: false },
        'Готовится': { id: 3, isSelected: false, isAvailable: false },
        'Готов': { id: 4, isSelected: false, isAvailable: false },
        'В пути': { id: 5, isSelected: false, isAvailable: false },
        'Доставлен': { id: 6, isSelected: false, isAvailable: false },
        'Закрыт': { id: 7, isSelected: false, isAvailable: false },
    },
    activeStatusesList: {},
    copyStatusesList: {},
    copyActiveStatusesList: {},
};

export const statuses = {
    valuesOfStatuses: {
        'Создан': { id: 1, isSelected: false, isAvailable: true },
        'Обрабатывается': { id: 2, isSelected: false, isAvailable: false },
        'Готовится': { id: 3, isSelected: false, isAvailable: false },
        'Готов': { id: 4, isSelected: false, isAvailable: false },
        'В пути': { id: 5, isSelected: false, isAvailable: false },
        'Доставлен': { id: 6, isSelected: false, isAvailable: false },
        'Закрыт': { id: 7, isSelected: false, isAvailable: false },
    },
    activeStatusesList: {},
    copyStatusesList: {},
    copyActiveStatusesList: {},
};
