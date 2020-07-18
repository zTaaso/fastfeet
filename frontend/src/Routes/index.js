import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryMen from '../pages/DeliveryMen';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} isPublic />

      <Route path="/deliveries" component={Deliveries} />
      <Route path="/deliverymen" component={DeliveryMen} />

      <Route path="/" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
}

export default Routes;
