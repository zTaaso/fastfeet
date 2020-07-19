import React from 'react';
import Proptypes from 'prop-types';

import Header from '../../../components/Header';

import { Wrapper, Content } from './styles';

function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: Proptypes.element.isRequired,
};
