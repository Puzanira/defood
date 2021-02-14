import React, { useReducer, useEffect } from 'react';

import './check-activity.css';

/**
 * Check activity fragment
 * @return {jsx}
 */
export const CheckActivityFragment = ({ isTransferred }) => {
    const initialState = {
        // valuesOfStatuses: [
        //     // {id: 8, value: 'Переведен в КС', isSelected: false, isAvailable: false},
        //     // {id: 9, value: 'Ожидает перевода', isSelected: false, isAvailable: false},
        // ],
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

    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'CHANGE_FIELD':
                    return { ...state, [action.field]: action.value };
                case 'CHANGE_STATUS_MARKER': {
                    const newStatuses = {};

                    Object.keys(state.valuesOfStatuses).forEach(elem => {
                        if (state.valuesOfStatuses[elem].id === action.id)
                        state.valuesOfStatuses[elem].isSelected = true;


                        if (state.valuesOfStatuses[elem].id === action.id + 1)
                        state.valuesOfStatuses[elem].isAvailable = true;


                        newStatuses[elem] = state.valuesOfStatuses[elem];
                    });

                    return { ...state, valuesOfStatuses: newStatuses };
                }
                case 'ADD_ITEM_TO_ACTIVE_LIST':
                    return {
                        ...state,
                        activeStatusesList: {
                            ...state.activeStatusesList,
                            [action.id]: { time: action.time, value: action.value },
                        },
                    };
                case 'BLOCK_ALL_VALUES_OF_STATUSES':
                    return {
                        ...state,
                        valuesOfStatuses: initialState.valuesOfStatuses,
                        activeStatusesList: initialState.activeStatusesList,
                    };
                case 'CREATE_COPY':
                    return {
                        ...state,
                        copyStatusesList: state.valuesOfStatuses,
                        copyActiveStatusesList: state.activeStatusesList,
                    };
                case 'DELETE_COPY':
                    return {
                        ...state,
                        valuesOfStatuses: state.copyStatusesList,
                        activeStatusesList: state.copyActiveStatusesList,
                        copyStatusesList: initialState.copyStatusesList,
                        copyActiveStatusesList: initialState.copyActiveStatusesList,
                    };
                case 'DELETE_IS_AVAILABLE_BY_INDEX': {
                    const newStatus = { ...state.valuesOfStatuses };
                    newStatus[action.key].isAvailable = false;

                    return { ...state, valuesOfStatuses: newStatus };
                }
                default:
                    return state;
            }
        },
        initialState,
    );

    const changeField = (field, value) => {
        dispatch({ type: 'CHANGE_FIELD', field, value });
    };

    const changeStatusMarker = id => {
        dispatch({ type: 'CHANGE_STATUS_MARKER', id });
    };

    const addItemToActiveList = (id, value) => {
        const date = new Date();
        dispatch({
            type: 'ADD_ITEM_TO_ACTIVE_LIST',
            id,
            value,
            time: date.toTimeString(date.getTime).split(' ')[0],
        });
    };

    const {
        valuesOfStatuses,
        activeStatusesList,
        copyStatusesList,
        copyActiveStatusesList,
    } = state;

    const setMarkedPoint = (id, value, isSelected) => {
        if (!isSelected) {
            changeStatusMarker(Number(id));
            addItemToActiveList(id, value);
        }
    };

    useEffect(() => {
        if (isTransferred) {
            dispatch({ type: 'CREATE_COPY' });
            dispatch({ type: 'BLOCK_ALL_VALUES_OF_STATUSES' });
            dispatch({ type: 'DELETE_IS_AVAILABLE_BY_INDEX', key: 'Создан' });
            addItemToActiveList(10, 'Передан в другой пункт');
        } else if (Object.keys(copyStatusesList).length > 0)
            dispatch({ type: 'DELETE_COPY' });
    }, [isTransferred]);

    return (
        <div className='check-activity-admin'>
            <div className='check-activity-admin-items'>
                {Object.keys(valuesOfStatuses).map((elem, index) => (
                    <div
                        className={`check-activity-admin-items__item ${valuesOfStatuses[elem].isAvailable ? '' : 'disabled-elem'}`}
                        key={index}
                        onClick={() => setMarkedPoint(valuesOfStatuses[elem].id, elem, valuesOfStatuses[elem].isSelected)}
                    >
                        <div
                            className={`check-activity-admin-items__point 
                            ${valuesOfStatuses[elem].isSelected ? 'check-activity-admin-items__point_black-point' : ''}`}
                        />
                        <div className='check-activity-admin-items__text'>{elem}</div>
                    </div>
                ))}
            </div>
            {Object.keys(activeStatusesList).length > 0 && (
                <div className='check-activity-admin-times'>
                    {Object.keys(activeStatusesList).map((elem, index) => (
                        <div className='check-activity-admin-times__item' key={index}>
                            <div className='check-activity-admin-times__time'>{activeStatusesList[elem].time}</div>
                            <div className='check-activity-admin-items__text'>{activeStatusesList[elem].value}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

