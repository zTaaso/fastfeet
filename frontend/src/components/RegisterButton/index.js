import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from './styles';

function RegisterButton(props) {
  return (
    <Button {...props}>
      <AiOutlinePlus size={20} color="#fff" id="svg" />
      <span>Cadastrar</span>
    </Button>
  );
}

export default RegisterButton;
