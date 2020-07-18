import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function RouteWrapper({ component: Component, isPublic = false, ...rest }) {
  const signed = true;

  if (!signed && !isPublic) {
    return <Redirect to="/" />;
  }

  if (signed && isPublic) {
    return <Redirect to="/deliveries" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          <Component {...props} />
        </div>
      )}
    />
  );
}

export default RouteWrapper;
