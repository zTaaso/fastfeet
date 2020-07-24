import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Router';

import SignIn from '../pages/SignIn';
import Deliveries from '../pages/Deliveries';
import DeliveryMen from '../pages/DeliveryMen';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';
import DeliveriesForm from '../pages/DeliveriesForm';
import RecipientsForm from '../pages/RecipientsForm';
import DeliveryMenForm from '../pages/DeliveryMenForm';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} isPublic />

      <Route path="/deliveries" exact component={Deliveries} />
      <Route path="/deliverymen" exact component={DeliveryMen} />
      <Route path="/recipients" exact component={Recipients} />
      <Route path="/problems" exact component={Problems} />

      <Route
        path={['/deliveries/:id/form', '/deliveries/register']}
        component={DeliveriesForm}
        exact
      />
      <Route
        path={['/recipients/:id/form', '/recipients/register']}
        component={RecipientsForm}
        exact
      />
      <Route
        path={['/deliverymen/:id/form', '/deliverymen/register']}
        component={DeliveryMenForm}
        exact
      />

      <Route path="/" component={() => <h1>Página não encontrada</h1>} />
    </Switch>
  );
}

export default Routes;
