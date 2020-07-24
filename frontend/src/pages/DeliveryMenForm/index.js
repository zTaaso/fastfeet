import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InputStyled } from './styles';

import EntityForm from '../_layouts/EntityForm';

import Dropzone from '../../components/Dropzone';

function DeliveryMenForm() {
  const [imgFile, setImgFile] = useState(new File());
  const img = '';

  const { location } = useHistory();
  const titleWord = location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  return (
    <EntityForm title={`${titleWord} de entregadores`}>
      <Dropzone
        img={img}
        onFileChange={(file) => {
          setImgFile(file);
        }}
      />

      <InputStyled typeName="label" label="Nome" type="text" width={100} />
      <InputStyled
        typeName="label"
        label="Email"
        type="email"
        labelWidth={100}
      />
    </EntityForm>
  );
}

export default DeliveryMenForm;
