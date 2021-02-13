import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
export const ListPartFragment = ({ data }) => {
    const history = useHistory();

    const labelColor = {
        'Создан': 'list-part-left__label_green',
        'Обрабатывается': 'list-part-left__label_dark-green',
        'Готовится': 'list-part-left__label_orange',
        'Готов': 'list-part-left__label_dark-orange',
        'В пути': 'list-part-left__label_blue',
        'Доставлен': 'list-part-left__label_dark-blue',
        'Закрыт': 'list-part-left__label_gray',

        'Переведен в КС': 'list-part-left__label_dark-purple',
        'Ожидает перевода': 'list-part-left__label_purple',
    };

    const transferredColor = {
        'Переведен в КС': 'list-part_dark-purple',
        'Ожидает перевода': 'list-part_purple',
    };

    const routToOrderHandler = () => {
        history.push(`/admin/check/${data.number}`);
    };

    return (
        <div className={`list-part ${transferredColor[data.label]}`} onClick={() => routToOrderHandler()}>
            <div className='list-part-left'>
                <div className='list-part-left__title'>
                    {data.title}
                </div>
                <div className={`list-part-left__label ${labelColor[data.label]}`}>
                    {data.label}
                </div>
            </div>
            <div className='list-part-middle'>
                <div className='list-part-middle__text list-part-middle_margin-bottom'>
                    {data.content}
                </div>
                <div className='list-part-middle__text'>
                    {data.home}
                </div>
            </div>
            <div className='list-part-right'>
                {data.cost}
            </div>
        </div>
    );
};
