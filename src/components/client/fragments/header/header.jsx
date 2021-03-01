import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import InputBase from '@material-ui/core/InputBase';
import { NODE_CONFIG } from '../../../../config';


import './header.css';


export const Header = props => {
    const data = useSelector(state => state.client.order);
    const { size, config, zones } = props;
    const { title, background } = config;

    const styles = {
        background: `linear-gradient(0deg, #000000 0%, rgba(128, 128, 128, 0) 100%), url('${background}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

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
                    <Link to='/check/'>
                        <IconButton color='inherit' className='page-header__link'>
                            <Badge color='secondary'>
                                <DepartureBoardIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                    <Link to='/order/'>
                        <IconButton color='inherit' className='page-header__link'>
                            <Badge badgeContent={data.length} color='secondary'>
                                <LocalMallIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
            <div className='page-header__placeholder' style={styles}>
                <Link to='/' className='page-header__title'>{ NODE_CONFIG.name }</Link>
            </div>
            <div className='page-sub-header' />
        </div>
    );
};
