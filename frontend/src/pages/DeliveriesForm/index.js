import React from 'react';

import { useHistory } from 'react-router-dom';
import { InputStyled, InputRow } from './styles';

import EntityForm from '../_layouts/EntityForm';

function DeliveriesSection() {
  const { location } = useHistory();

  const titleWord = location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  const recipientOptions = [
    { value: 'Naruto', label: 'Naruto' },
    { value: 'Sasuke', label: 'Sasuke' },
    { value: 'Sakura', label: 'Sakura' },
  ];

  return (
    <EntityForm title={`${titleWord} de encomendas`}>
      <InputRow>
        <InputStyled
          typeName="labeled-select"
          label="Destinatário"
          type="text"
          width={95}
          options={recipientOptions}
          ignoreCase="false"
        />
        <InputStyled
          typeName="labeled-select"
          label="Entregador"
          type="text"
          width={100}
        />
      </InputRow>

      <InputStyled
        typeName="label"
        label="Nome do produto"
        type="email"
        width={100}
      />
    </EntityForm>
  );
}

export default DeliveriesSection;
