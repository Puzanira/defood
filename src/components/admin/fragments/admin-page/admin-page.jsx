import React from 'react';

import { HeaderFragment } from '../header';
import './admin-page.css';

/**
 * Admin page fragment
 * @return {jsx}
 */
export const AdminPageFragment = ({ children }) => (
    <div className='admin-page'>
        <HeaderFragment />
        <div className='admin-page__content'>
            {children}
        </div>
    </div>
);
