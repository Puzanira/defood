import React, {useReducer} from 'react';
import {useHistory} from 'react-router-dom';

import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
function ListPartFragment({data}) {
    const history = useHistory();

    const lableColor = {
        'Создан': 'list-part-left__lable_green',
        'Обрабатывается': 'list-part-left__lable_dark-green',
        'Готовится': 'list-part-left__lable_orange',
        'Готов': 'list-part-left__lable_dark-orange',
        'В пути': 'list-part-left__lable_blue',
        'Доставлен': 'list-part-left__lable_dark-blue',
        'Закрыт': 'list-part-left__lable_gray',

        'Переведен в КС': 'list-part-left__lable_dark-purple',
        'Ожидает перевода': 'list-part-left__lable_purple',
    };

    const transferredColor = {
        'Переведен в КС': 'list-part_dark-purple',
        'Ожидает перевода': 'list-part_purple',
    }


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

    const routToOrderHandler = () => {
        history.push(`/admin/check/${dataComp.number}`);
    }

    return (
        <div className={`list-part ${transferredColor[dataComp.lable]}`} onClick={() => routToOrderHandler()}>
            <div className="list-part-left">
                <div className="list-part-left__title">
                    {dataComp.title}
                </div>
                <div className={`list-part-left__lable ${lableColor[dataComp.lable]}`}>
                    {dataComp.lable}
                </div>
            </div>
            <div className="list-part-middle">
                <div className="list-part-middle__text list-part-middle_margin-bottom">
                    {dataComp.content}
                </div>
                <div className="list-part-middle__text">
                    {dataComp.home}
                </div>
            </div>
            <div className="list-part-right">
                {dataComp.cost}
            </div>
        </div>
    );
}

export default ListPartFragment;
