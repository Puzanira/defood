import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { RouterStore } from '../../../../store/routes';
import { useSelector } from 'react-redux';
import { config, NODE_CONFIG } from '../../../../config';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import './address-layout.css';


export const AddressLayout = () => {
    const history = useHistory();
    const address = useSelector(state => state.client.address);

    const addOrder = useAction(
        address => clientActions.updateAddress({ address }),
        [],
    );

    const handlerChangeAddress = event => {
        addOrder(event.target.value !== 'None' ? event.target.value : null);
    };

    const handlerSubmit = event => {
        history.push(RouterStore.website.list);
    };

    const zonesMap = Object.entries(config.zone).map(([key, value], index) => (<option key={index} value={key}>{value}</option>));

    return (
        <div className='address-page'>
            <div className='address-page__header'>
                <div className='address-page__title'>{ NODE_CONFIG.name }</div>
            </div>
            <div className='address-page__sidebar'>
                <div className='address-page__left-bar'>
                    <div className='address-page__pizza-title'>
                        <div className='address-page__pizza-title-text'>{ NODE_CONFIG.name }</div>
                    </div>
                    <div className='address-form'>
                        <div className='address-form__title'>Выберите ваш адрес доставки</div>
                        <div className='address-form__item'>
                            <div className='address-form__sub-title'>Ваш район</div>
                            <FormControl variant='outlined'>
                                <Select
                                    native
                                    value={address}
                                    onChange={handlerChangeAddress}
                                >
                                    <option value={null}>None</option>
                                    { zonesMap }
                                </Select>
                            </FormControl>
                        </div>
                        { address ? <div className='address-form__button' onClick={handlerSubmit}>Перейти к выбору</div> : null }
                    </div>
                </div>
                <div className='address-page__right-bar'>
                    <video
                        className='address-page__right-bar_video'
                        loop
                        muted
                        autoPlay
                        playsInline
                        preload='auto'
                    >
                        <source
                            src='https://yastatic.net/s3/distribution/lpc-assets/LPCSUPPORT-1285/YNDX%20LOGISTICS%2010-15%20low.mp4'
                            type='video/mp4'
                        />
                    </video>
                </div>
            </div>
        </div>
    );
};
