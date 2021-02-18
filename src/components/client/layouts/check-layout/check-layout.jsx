import React, { Component, useEffect } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useSelector } from 'react-redux';
import { Order } from '../../fragments/order';
import { Page } from '../../fragments/page';
import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';

import './check-layout.css';


export const CheckLayout = () => {
    const steps = ['Оформлен', 'Изготавливается', 'Готов', 'В пути', 'Доставлен'];
    const waiting = useSelector(state => state.client.waiting);
    const ticket = useSelector(state => state.client.ticket);

    const { address, info, date, pay } = ticket;

    const getItems = useAction(
        id => clientActions.getTicketData({ id }),
        [],
    );

    useEffect(() => {
        getItems(0);
    }, []);

    const stepper = steps.map(item => (
        <Step key={item}>
            <StepLabel>{item}</StepLabel>
        </Step>
        ));

    return (
        <Page header='small'>
            <div className='check-title'>Заказ № 111</div>
            <div className='check-content'>
                <div className='check-content__left-side'>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Доставка по адресу</div>
                        <div className='left-side__item-content'>{ address }</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Получатель</div>
                        <div className='left-side__item-content'>{ info }</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Время оформления</div>
                        <div className='left-side__item-content'>{ date }</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Оплата</div>
                        <div className='left-side__item-content'>{ pay }</div>
                    </div>
                </div>
                <Order visible={false} />
            </div>
            <Stepper className='check-controls' activeStep={waiting}>
                { stepper }
            </Stepper>
        </Page>
    );
};
