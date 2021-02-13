import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';

import { store } from './configureStore';
import { RouterStore } from './store/routes';
import ListLayout from './components/client/layouts/list-layout/list-layout';
import CheckLayout from './components/client/layouts/check-layout/check-layout';
import OrderLayout from './components/client/layouts/order-layoyut/order-layout';
import CheckAdmintLayout from './components/admin/layouts/check-admin-layout/check-admin-layout';
import ListAdminLayout from '../admin/layouts/list-layout/list-layout';


export class App extends Component {
  constructor(props) {
    super(props);
    this.store = store;

      const route = (path, layout, exact = true) => ({ path, layout, exact });


      this.routes = [
          route(RouterStore.website.index, <ListLayout />),
          route(RouterStore.website.check, <CheckLayout />),
          route(RouterStore.website.order, <OrderLayout />),
          route(RouterStore.admin.index, <ListAdminLayout />),
          route(RouterStore.admin.check, <CheckAdmintLayout />),
      ];
  }

    render() {
        const routes = this.routes.map((route, idx) => {
            const { path, layout, exact } = route;
            return <Route key={idx} path={path} exact={exact} render={() => layout} />;
        });
    return (
        <Provider store={this.store}>
            <PersistGate loading={null} persistor={this.store.persistor}>
                <ConnectedRouter history={this.store.history}>
                    <Switch>
                        { routes }
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
  }
}
