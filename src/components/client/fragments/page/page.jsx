import React from 'react';

import { Header } from '../header';
import { Footer } from '../footer';

import './page.css';


export const Page = props => (
    <div className='page'>
        <Header size={props.header} />
        <div className='page__content'>
            { props.children }
        </div>
        <Footer />
    </div>
);
