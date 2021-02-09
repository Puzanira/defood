import React, {useReducer} from 'react';

import './check-activity.css';

/**
 * List-part fragment
 * @return {jsx}
 */
function CheckActivityFragment({}) {
    const data = [];

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
        <div className="check-activity-admin">
            <div className="check-activity-admin-items">
                <div className="check-activity-admin-items__item">
                    <div className="check-activity-admin-items__point check-activity-admin-items__point_black-point"/>
                    <div className="check-activity-admin-items__text">Изготавливается</div>
                </div>
                <div className="check-activity-admin-items__item">
                    <div className="check-activity-admin-items__point check-activity-admin-items__point_black-point"/>
                    <div className="check-activity-admin-items__text">Готов</div>
                </div>
                <div className="check-activity-admin-items__item">
                    <div className="check-activity-admin-items__point check-activity-admin-items__point_black-point"/>
                    <div className="check-activity-admin-items__text">В пути</div>
                </div>
                <div className="check-activity-admin-items__item">
                    <div className="check-activity-admin-items__point"/>
                    <div className="check-activity-admin-items__text">Доставлен</div>
                </div>
            </div>
            <div className="check-activity-admin-times">
                <div className="check-activity-admin-times__item">
                    <div className="check-activity-admin-times__time">17:00</div>
                    <div className="check-activity-admin-items__text">Принято на изготовление</div>
                </div>
                <div className="check-activity-admin-times__item">
                    <div className="check-activity-admin-times__time">17:30</div>
                    <div className="check-activity-admin-items__text">Готов</div>
                </div>
                <div className="check-activity-admin-times__item">
                    <div className="check-activity-admin-times__time">18:00</div>
                    <div className="check-activity-admin-items__text">Отправлен</div>
                </div>
            </div>
        </div>
    );
}

export default CheckActivityFragment;
