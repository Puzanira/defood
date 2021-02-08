import React, { Component } from 'react';
import Page from "../../fragments/page/page";
import ListItems from "../../fragments/list-items/list-items";

import './list-layout.css';

class ListLayout extends Component {
    render() {
        return(
          <Page>
              <div className={'list-title'}>Пицца</div>
              <ListItems />
          </Page>
        );
    }
} export default ListLayout;
