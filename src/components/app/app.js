import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RouterStore } from '../../store/routes';

import ListLayout from "../client/layouts/list-layout/list-layout";
import CheckLayout from "../client/layouts/check-layout/check-layout";

import AdminListLayout from '../admin/layouts/list-layout.js/list-layout';


class App extends Component {
  constructor(props) {
    super(props);

    const route = (path, layout, exact = true) => ({path, layout, exact});

    this.routes = [
        route(RouterStore.website.index, <ListLayout/>),
        route(RouterStore.website.check, <CheckLayout/>),
        route(RouterStore.admin.index, <AdminListLayout />)
    ];

  }

  render() {
      const routes = this.routes.map((route, idx) => {
          const { path, layout, exact } = route;
          return <Route key={idx} path={path} exact={exact} render={() => layout} />;
      });

    return(
        <BrowserRouter>
            <div className={'component-app'}>
                <Switch>
                    { routes }
                </Switch>
            </div>
        </BrowserRouter>
    );
  }

}
export default App;
