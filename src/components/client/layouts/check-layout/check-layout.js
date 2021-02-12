import React, { Component } from 'react';
import Page from "../../fragments/page/page";
import Order from "../../fragments/order/order";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


import './check-layout.css';

class CheckLayout extends Component {
    render() {
        const steps = ['Оформлен', 'Изготавливается', 'Готов', 'В пути', 'Доставлен'];
        const stepper = steps.map((item) => {
            return (
                <Step key={item}>
                    <StepLabel>{item}</StepLabel>
                </Step>
            );
        });
        return(
            <Page header={'small'}>
                <div className={'check-title'}>Заказ № 111</div>
                <div className={'check-content'}>
                    <div className={'check-content__left-side'}>
                        <div className={'left-side__item'}>
                            <div className={'left-side__item-title'}>Доставка по адресу</div>
                            <div className={'left-side__item-content'}>Москва, ул. Юных Ленинцев 12/17 к1</div>
                        </div>
                        <div className={'left-side__item'}>
                            <div className={'left-side__item-title'}>Получатель</div>
                            <div className={'left-side__item-content'}>Ольга, +7 916 720 64 95</div>
                        </div>
                        <div className={'left-side__item'}>
                            <div className={'left-side__item-title'}>Время оформления</div>
                            <div className={'left-side__item-content'}>2 февраля 2021 17:00</div>
                        </div>
                        <div className={'left-side__item'}>
                            <div className={'left-side__item-title'}>Оплата</div>
                            <div className={'left-side__item-content'}>Онлайн на сайте</div>
                        </div>
                    </div>
                    <Order />
                </div>
                <Stepper className={'check-controls'} activeStep={-1}>
                    { stepper }
                </Stepper>
            </Page>
        );
    }
} export default CheckLayout;
