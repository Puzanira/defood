import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
export const ListPartFragment = ({ data }) => {
    const history = useHistory();

    const initialState = {
        dataComp: data,
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

    const changeField = (field, value) => {
        dispatch({ type: 'CHANGE_FIELD', field, value });
    };

    const {
        dataComp,
    } = state;

    const routToOrderHandler = () => {
        history.push(`/admin/check/${dataComp.number}`);
    };

    return (
        <div className={`list-part ${transferredColor[dataComp.label]}`} onClick={() => routToOrderHandler()}>
            <div className='list-part-left'>
                <div className='list-part-left__title'>
                    {dataComp.title}
                </div>
                <div className={`list-part-left__label ${labelColor[dataComp.label]}`}>
                    {dataComp.label}
                </div>
            </div>
            <div className='list-part-middle'>
                <div className='list-part-middle__text list-part-middle_margin-bottom'>
                    {dataComp.content}
                </div>
                <div className='list-part-middle__text'>
                    {dataComp.home}
                </div>
            </div>
            <div className='list-part-right'>
                {dataComp.cost}
            </div>
        </div>
    );
};
