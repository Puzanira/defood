import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useSelector } from 'react-redux';
import { Order } from '../../fragments/order';
import { Page } from '../../fragments/page';


import './check-layout.css';


export const CheckLayout = () => {
    const steps = ['Оформлен', 'Изготавливается', 'Готов', 'В пути', 'Доставлен'];
    const data = useSelector(state => state.client.waiting);

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
                        <div className='left-side__item-content'>Москва, ул. Юных Ленинцев 12/17 к1</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Получатель</div>
                        <div className='left-side__item-content'>Ольга, +7 916 720 64 95</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Время оформления</div>
                        <div className='left-side__item-content'>2 февраля 2021 17:00</div>
                    </div>
                    <div className='left-side__item'>
                        <div className='left-side__item-title'>Оплата</div>
                        <div className='left-side__item-content'>Онлайн на сайте</div>
                    </div>
                </div>
                <Order />
            </div>
            <Stepper className='check-controls' activeStep={data}>
                { stepper }
            </Stepper>
        </Page>
    );
};
