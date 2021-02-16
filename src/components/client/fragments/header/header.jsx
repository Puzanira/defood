import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import './header.css';


export const Header = ({ size }) => {
    const data = useSelector(state => state.client.order);

    return (
        <div className={size ? 'page-header page-header_small' : 'page-header'}>
            <AppBar className='page-header__wrap' position='absolute' color='inherit'>
                <Toolbar className='page-header__wrap'>
                    <div className='page-header__search'>
                        <div className='page-header__search-icon'>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                input: 'page-header__search-input',
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Link to='/order/'>
                        <IconButton color='inherit' className='page-header__link'>
                            <Badge badgeContent={data.length} color='secondary'>
                                <LocalMallIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className='page-header__placeholder'>
                <Link to='/' className='page-header__title'>Decentralized Pizza</Link>
            </div>
            <div className='page-sub-header' />
        </div>
    );
};
