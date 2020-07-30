import React from 'react';
import Proptypes from 'prop-types';
import { AiOutlineMeh } from 'react-icons/ai';

import { Container } from './styles';

function NothingHere({ children }) {
  return (
    <Container>
      <p>{children}</p>
      <AiOutlineMeh size={40} color="#7d40e7" />
    </Container>
  );
}

export default NothingHere;

NothingHere.propTypes = {
  children: Proptypes.string.isRequired,
};
