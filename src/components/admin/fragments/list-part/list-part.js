import React, {useReducer} from 'react';

import './list-part.css';

/**
 * List-part fragment
 * @return {jsx}
 */
function ListPartFragment({}) {
    const data =  {
        title: 'Заказ №1212121',
        lable: 'Принят',
        content: 'Пицца “Бавария” 25 см, пицца “Карбонара 30см',
        home: 'Москва, ул. Юных Ленинцев 12/17 к1',
        cost: '950 ₽'
    };

    const lable = {
        'Принят': 'list-part-left__lable_green',
        'В пути': 'list-part-left__lable_blue',
    };

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
        <div className="list-part">
            <div className="list-part-left">
                <div className="list-part-left__title">
                    {dataComp.title}
                </div>
                <div className={`list-part-left__lable ${lable[dataComp.lable]}`}>
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
