import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';


/**
 * Header fragment
 * @return {jsx}
 */
export const HeaderFragment = () => (
    <div className='header-admin-container'>
        <div className='header-admin'>
            <Link to='/admin/index' className='header-admin__logo'>DePi Admin</Link>
            <div className='header-admin__links'>
                <Link to='/admin/index' className='header-admin__link'>Заказы</Link>
                <div className='header-admin__link'>Профиль</div>
            </div>
        </div>
    </div>
);
