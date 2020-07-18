import React from 'react';
import Proptypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

function RouteWrapper({ component: Component, isPublic, ...rest }) {
  const signed = false;

  if (!signed && !isPublic) {
    return <Redirect to="/" />;
  }

  if (signed && isPublic) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default RouteWrapper;

RouteWrapper.propTypes = {
  component: Proptypes.oneOfType([Proptypes.element, Proptypes.func])
    .isRequired,
  isPublic: Proptypes.bool,
};

RouteWrapper.defaultProps = {
  isPublic: false,
};
