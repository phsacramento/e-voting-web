import React                                         from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import auth                                          from './auth/authenticator';

// Containers
import Full                                          from './containers/Full/';
import Simple                                        from './containers/Simple/';

// Pages
import Login                                         from './views/Pages/Login/';
import Dashboard                                     from './views/Pages/Dashboard/';

// Resources

import Roles                                         from './views/Pages/Roles/';
import RoleDetail                                    from './views/Pages/Roles/RoleDetail';


export default (
  <Router history={browserHistory}>

    <Route path="/" component={Simple}>
      <IndexRoute component={Login}/>
    </Route>

    <Route path="/dashboard" name="Home" component={Full} onEnter={requireAuth}>
      <IndexRoute component={Dashboard}/>
      <Route path="home" name="Dashboard" onEnter={requireAuth} component={Dashboard}/>

      <Route path="cargos" name="Listar Cargos" onEnter={requireAuth} component={Roles}/>
      <Route path="/cargos/adicionar" name="Adicionar Cargo" onEnter={requireAuth} component={RoleDetail}/>
      <Route path="/cargos/:id" name="Cargo" onEnter={requireAuth} component={RoleDetail}/>
    </Route>

  </Router>
);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
