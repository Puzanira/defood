import React, { useReducer, useEffect } from 'react';

import './check-activity.css';
import { useSelector } from 'react-redux';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { TransferSelectFragment } from '../transfer-select';

/**
 * Check activity fragment
 * @return {jsx}
 */
export const CheckActivityFragment = ({ history }) => (
    <>
        <div className='admin-check-layout-modern-title admin-check-layout-title_margin-top'>
            <div className='admin-check-layout-title'>
                История заказа
            </div>
        </div>
        <div className='check-activity-admin'>
            <div className='check-activity-admin-items'>
                {history && history.map((elem, index) => (
                    <div
                        className='check-activity-admin-items__item'
                        key={index}
                    >
                        <div className='check-activity-admin-items__point check-activity-admin-items__point_black-point' />
                        <div className='check-activity-admin-items__text'>{elem.status}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );

