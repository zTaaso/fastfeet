import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Router';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryMen from '../pages/DeliveryMen';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} isPublic />

      <Route path="/deliveries" component={Deliveries} />
      <Route path="/deliveryman" component={DeliveryMen} />
      <Route path="/recipients" component={Recipients} />
      <Route path="/problems" component={Problems} />

      <Route path="/" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
}

export default Routes;
