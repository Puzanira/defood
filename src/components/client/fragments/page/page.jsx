import React from 'react';

import { Header } from '../header';
import { Footer } from '../footer';
import { Pallete } from '../../../../pallete';
import { config } from '../../../../config';

import './page.css';


export const Page = props => (
    <div className='page'>
        <Header size={props.header} config={Pallete} zones={config.zone} />
        <div className='page__content'>
            { props.children }
        </div>
        <Footer config={Pallete} />
    </div>
);
