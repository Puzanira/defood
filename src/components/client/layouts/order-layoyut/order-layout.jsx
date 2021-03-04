import React from 'react';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useAction } from '../../../../utils';
import { clientActions } from '../../../../state/client/actions';
import { Page } from '../../fragments/page';
import { Order } from '../../fragments/order';
import './order-layout.css';


function isLatin(str) {
    const regex = /^([A-Za-z\s]*)$/;
    return regex.test(str);
}

const required = value => value ? undefined : 'Обязательное поле';
const mustBeLatinSymbols = value => isLatin(value) ? undefined : 'Пишите имя латинскими буквами';
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);


export const OrderLayout = () => {
    const history = useHistory();

    const order = useSelector(state => state.client.order);

    const fetchFormData = useAction(
        formData => clientActions.fetchFormData({ formData, history }),
        [history],
    );

    return (
        <Page>
            <Order visible />
            <Form
                onSubmit={fetchFormData}
                render={({ handleSubmit }) => (
                    <form className='checkout' onSubmit={handleSubmit}>
                        <div className='checkout__title'>Оформление заказа</div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Имя</div>
                            <Field
                                validate={composeValidators(required, mustBeLatinSymbols)}
                                className='checkout-item__input'
                                name='name'
                                type='text'
                                component='input'
                            >
                                {({ input, meta }) => (
                                    <div>
                                        <input className='checkout-item__input' {...input} />
                                        {meta.error && meta.touched &&
                                        <div className='checkout-item__input-error'>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Номер телефон</div>
                            <Field
                                validate={required}
                                name='number'
                                type='text'
                                component='input'
                            >
                                {({ input, meta }) => (
                                    <div>
                                        <input className='checkout-item__input' {...input} />
                                        {meta.error && meta.touched &&
                                            <div className='checkout-item__input-error'>{meta.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className='checkout-item'>
                            <div className='checkout-item__title'>Способ оплаты</div>
                            <div className='checkout-item__wrap'>
                                <div className='checkout-item__card'>Картой</div>
                                <div className='checkout-item__card'>Наличными</div>
                                <div className='checkout-item__card'>Яндекс Деньги</div>
                                <div className='checkout-item__card'>Web Money</div>
                            </div>
                        </div>
                        <button className='checkout__submit' type='submit' disabled={order.length === 0}>Оформить</button>
                    </form>
                )}
            />
        </Page>
    );
};


