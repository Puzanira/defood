import React from 'react';

import { Item } from '../item';
import './list-items.css';


export const ListItems = ({ items }) => (
    <div className='list-items'>
        {items && items.map((item, index) => <Item key={index} data={item} />)}
    </div>
);
