import React, { Component } from 'react';

import './order.css';
import OrderItem from "../order-item/order-item";

class Order extends Component {
    render() {
        return(
            <div className={'order'}>
                <div className={'order__content'}>
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </div>
                <div className={'order__sum'}>
                    <div>Итого:</div>
                    <div>950 ₽ </div>
                </div>
            </div>
        );
    }
} export default Order;
