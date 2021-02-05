import React, { Component } from 'react';
import Page from "../../fragments/page/page";
import ListItems from "../../fragments/list-items/list-items";

class ListLayout extends Component {
    render() {
        return(
          <Page>
              <ListItems />
          </Page>
        );
    }
} export default ListLayout;
