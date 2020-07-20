import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { Button } from './styles';

function RegisterButton() {
  return (
    <Button>
      <AiOutlinePlus size={20} color="#fff" id="svg" />
      <span>Cadastrar</span>
    </Button>
  );
}

export default RegisterButton;
