import React, { Component } from 'react';
import Header from "../header/header";
import Footer from "../footer/footer";


import './page.css';

class Page extends Component {
    render() {
        return(
            <div className={'page'}>
                <Header />
                <div className={'page__content'}>
                    { this.props.children }
                </div>
                <Footer />
            </div>
        );
    }
} export default Page;
