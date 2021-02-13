import React from 'react';

import { HeaderFragment } from '../header';
import './admin-page.css';

/**
 * Admin page fragment
 * @return {jsx}
 */
export const AdminPageFragment = props => (
    <div className='admin-page'>
        <HeaderFragment />
        <div className='admin-page__content'>
            {props.children}
        </div>
    </div>
);
