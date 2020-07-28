import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { InputStyled } from './styles';

import EntityForm from '../_layouts/EntityForm';

import Dropzone from '../../components/Dropzone';
import api from '../../services/api';

function DeliveryMenForm({ match }) {
  const deliverymanId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [imgURL, setImgURL] = useState('');

  const [imgFile, setImgFile] = useState(
    new File([{ type: 'img' }], 'null.png')
  );

  const history = useHistory();
  const status = history.location.pathname.includes('register')
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

      if (status === 'Cadastro') {
        await api.post('/deliveryman', { name, email, avatar_id });
      } else {
        await api.put(`/deliveryman/${deliverymanId}`, {
          name,
          email,
          avatar_id,
        });
      }

      toast.success('Entregador salvo com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error('Algo deu errado!');
    }
  }

  useEffect(() => {
    async function getDeliveryman(id) {
      const response = await api.get(`/deliveryman/${id}`);
      const deliveryman = response.data;

      const avatarURL = deliveryman.avatar_id ? deliveryman.avatar.url : null;

      setImgURL(avatarURL);
      setName(deliveryman.name);
      setEmail(deliveryman.email);
    }

    if (status === 'Edição') {
      getDeliveryman(deliverymanId);
    }
  }, []);

  return (
    <EntityForm title={`${status} de entregadores`} onSave={handleSave}>
      <Dropzone
        img={imgURL}
        onFileChange={(file) => {
          setImgFile(file);
        }}
      />

      <InputStyled
        typeName="label"
        label="Nome"
        type="text"
        width={100}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputStyled
        typeName="label"
        label="Email"
        type="email"
        labelWidth={100}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </EntityForm>
  );
}

export default DeliveryMenForm;

DeliveryMenForm.propTypes = {
  match: Proptypes.shape({
    params: { id: Proptypes.number },
  }),
};

DeliveryMenForm.defaultProps = {
  match: {
    params: { id: null },
  },
};
