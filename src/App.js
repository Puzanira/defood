import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';

import { store } from './configureStore';
import { RouterStore } from './store/routes';
import { Pallete } from './pallete';
import { AuthComponent } from './core/auth/components/auth-component';
import { ListLayout } from './components/client/layouts/list-layout';
import { CheckLayout } from './components/client/layouts/check-layout';
import { OrderLayout } from './components/client/layouts/order-layoyut';
import { CheckAdminLayout } from './components/admin/layouts/check-admin-layout';
import { ListLayout as ListAdminLayout } from './components/admin/layouts/list-layout';
import { NODE } from './config';


export class App extends Component {
  constructor(props) {
    super(props);
      this.store = store;

      const route = (path, layout, exact = true) => ({ path, layout, exact });

      this.routes = NODE === 'DELIVERY' ? [
          route(RouterStore.admin.index, <ListAdminLayout />),
          route(RouterStore.admin.order, <CheckAdminLayout />),
      ] : [
          route(RouterStore.website.index, <ListLayout />),
          route(RouterStore.website.check, <CheckLayout />),
          route(RouterStore.website.order, <OrderLayout />),
          route(RouterStore.admin.index, <ListAdminLayout />),
          route(RouterStore.admin.order, <CheckAdminLayout />),
      ];

      this.routes.push(route('', <h1>404: Такой страницы не существует</h1>, false));
  }

    render() {
        const { barColor, footerColor, toggleColor, backgroundColor } = Pallete;

        document.documentElement.style.setProperty('--color-gray-1', barColor);
        document.documentElement.style.setProperty('--color-black', footerColor);
        document.documentElement.style.setProperty('--color-toggle', toggleColor);
        document.documentElement.style.setProperty('--color-background', backgroundColor);


        const routes = this.routes.map((route, idx) => {
            const { path, layout, exact } = route;
            return <Route key={idx} path={path} exact={exact} render={() => layout} />;
        });

    return (
        <Provider store={this.store}>
            <PersistGate loading={null} persistor={this.store.persistor}>
                <ConnectedRouter history={this.store.history}>
                    <AuthComponent>
                        <Switch>
                            { routes }
                        </Switch>
                    </AuthComponent>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
  }
}
