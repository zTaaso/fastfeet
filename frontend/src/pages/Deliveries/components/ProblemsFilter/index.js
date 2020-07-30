import React from 'react';
import { MdCancel } from 'react-icons/md';

import { Button } from './styles';

function ProblemsFilter(props) {
  return (
    <Button {...props}>
      <MdCancel size={20} color="#fff" />
      Encomendas com problema
    </Button>
  );
}

export default ProblemsFilter;
