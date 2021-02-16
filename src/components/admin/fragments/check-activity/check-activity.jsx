import React, { useReducer, useEffect } from 'react';

import './check-activity.css';
import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { useSelector } from 'react-redux';

/**
 * Check activity fragment
 * @return {jsx}
 */
export const CheckActivityFragment = () => {
    const isTransferred = useSelector(state => state.admin.checkData.isTransferred);
    const valuesOfStatuses = useSelector(state => state.admin.checkStatuses.valuesOfStatuses);
    const activeStatusesList = useSelector(state => state.admin.checkStatuses.activeStatusesList);
    const copyStatusesList = useSelector(state => state.admin.checkStatuses.copyStatusesList);

    const deleteCopiesOfLists = useAction(
        () => adminActions.deleteCopiesOfLists(),
        [],
    );

    const setMarkeredPoint = useAction(
        (id, value, isSelected) => adminActions.setMarkeredPoint({ id, value, isSelected }),
        [],
    );

    const setIsTransferredActivity = useAction(
        () => adminActions.setIsTransferredActivity(),
        [],
    );

    useEffect(() => {
        if (isTransferred)
            setIsTransferredActivity();
        else if (Object.keys(copyStatusesList).length > 0)
            deleteCopiesOfLists();
    }, [isTransferred]);

    return (
        <div className='check-activity-admin'>
            <div className='check-activity-admin-items'>
                {Object.keys(valuesOfStatuses).map((elem, index) => (
                    <div
                        className={`check-activity-admin-items__item ${valuesOfStatuses[elem].isAvailable ? '' : 'disabled-elem'}`}
                        key={index}
                        onClick={() => setMarkeredPoint(valuesOfStatuses[elem].id, elem, valuesOfStatuses[elem].isSelected)}
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

