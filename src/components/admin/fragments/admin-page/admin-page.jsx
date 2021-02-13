import React from 'react';

import './admin-page.css';
import HeaderFragment from '../header/header';

/**
 * Admin page fragment
 * @return {jsx}
 */
function AdminPageFragment(props) {
    return (
        <div className="admin-page">
            <HeaderFragment/>
            <div className="admin-page__content">
                {props.children}
            </div>
        </div>
    );
}

export default AdminPageFragment;
