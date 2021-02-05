import React, { Component } from 'react';
import Item from "../../fragments/item/item";

import './list-items.css'

class ListItems extends Component {
    render() {
        return(
            <div className={'list-items'}>
                <Item />
                <Item />
                <Item />
            </div>
        );
    }
} export default ListItems;
