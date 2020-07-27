import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { InputStyled } from './styles';

import EntityForm from '../_layouts/EntityForm';

import Dropzone from '../../components/Dropzone';
import api from '../../services/api';

function DeliveryMenForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [imgFile, setImgFile] = useState(
    new File([{ type: 'img' }], 'null.png')
  );

  const img = '';

  const history = useHistory();
  const titleWord = history.location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  async function handleSave() {
    try {
      let avatar_id = null;
      if (imgFile.size > 20) {
        const fileData = new FormData();
        fileData.append('file', imgFile);
        const response = await api.post('/files', fileData);
        avatar_id = response.data.id;
      }

      await api.post('/deliveryman', { name, email, avatar_id });

      alert('Entregador criado com sucesso!');
      history.goBack();
    } catch (err) {
      alert('Algo deu errado!');
    }
  }

  return (
    <EntityForm title={`${titleWord} de entregadores`} onSave={handleSave}>
      <Dropzone
        img={img}
        onFileChange={(file) => {
          setImgFile(file);
        }}
      />

      <InputStyled
        typeName="label"
        label="Nome"
        type="text"
        width={100}
        onChange={(e) => setName(e.target.value)}
      />
      <InputStyled
        typeName="label"
        label="Email"
        type="email"
        labelWidth={100}
        onChange={(e) => setEmail(e.target.value)}
      />
    </EntityForm>
  );
}

export default DeliveryMenForm;
