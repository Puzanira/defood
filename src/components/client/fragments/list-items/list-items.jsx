import React from 'react';

import { Item } from '../item';
import './list-items.css';


export const ListItems = props => {
    const data = props.items ? props.items.map((item, index) => <Item key={index} data={item} />) : null;
    return (
        <div className='list-items'>
            { data }
        </div>
    );
};
