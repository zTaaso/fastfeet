import React from 'react';
import { useHistory } from 'react-router-dom';

import { InputStyled, InputRow } from './styles';

import EntityForm from '../_layouts/EntityForm';

function RecipientForm() {
  const { location } = useHistory();
  const titleWord = location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  return (
    <EntityForm title={`${titleWord} de destinatários`}>
      <InputStyled typeName="label" label="Nome" type="text" width={100} />

      <InputRow>
        <InputStyled typeName="label" label="Rua" type="text" labelWidth={70} />
        <InputStyled
          typeName="label"
          label="Número"
          type="number"
          labelWidth={15}
        />

        <InputStyled
          typeName="label"
          label="Complemento"
          type="text"
          labelWidth={20}
        />
      </InputRow>

      <InputRow>
        <InputStyled
          typeName="label"
          label="Cidade"
          type="text"
          labelWidth={33}
        />
        <InputStyled
          typeName="label"
          label="Estado"
          type="text"
          labelWidth={33}
        />

        <InputStyled
          typeName="label"
          label="CEP"
          type="tel"
          pattern="[0-9\-]+"
          labelWidth={33}
        />
      </InputRow>
    </EntityForm>
  );
}

export default RecipientForm;
