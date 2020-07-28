import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { InputStyled, InputRow } from './styles';

import EntityForm from '../_layouts/EntityForm';

import api from '../../services/api';

function DeliveriesSection() {
  const history = useHistory();

  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(0);
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(0);

  const [product, setProduct] = useState('');

  const [options, setOptions] = useState({ recipients: [], deliverymen: [] });

  const titleWord = history.location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  async function handleSave() {
    try {
      await api.post('/delivery', {
        recipient_id: selectedRecipient,
        deliveryman_id: selectedDeliveryman,
        product,
      });
      alert('Encomenda criada com sucesso!');
      history.goBack();
    } catch (err) {
      alert('Algo deu errado na criação da entrega.');
    }
  }

  useEffect(() => {
    async function getDeliverymen() {
      const response = await api.get('deliveryman');
      const serializedResponse = response.data.map((deliveryman) => ({
        id: deliveryman.id,
        name: deliveryman.name,
      }));

      setDeliverymen(serializedResponse);
    }

    async function getRecipients() {
      const response = await api.get('recipients');
      const serializedResponse = response.data.map((recipient) => ({
        id: recipient.id,
        name: recipient.name,
      }));

      setRecipients(serializedResponse);
    }

    getDeliverymen();
    getRecipients();
  }, []);

  useEffect(() => {
    const serializedOptions = {
      recipients: recipients.map((recipient) => ({
        label: recipient.name,
        value: recipient.id,
      })),
      deliverymen: deliverymen.map((deliveryman) => ({
        label: deliveryman.name,
        value: deliveryman.id,
      })),
    };

    setOptions(serializedOptions);
  }, [recipients, deliverymen]);

  return (
    <EntityForm title={`${titleWord} de encomendas`} onSave={handleSave}>
      <InputRow>
        <InputStyled
          typeName="labeled-select"
          label="Destinatário"
          type="text"
          width={95}
          options={options.recipients}
          onChange={(e) => setSelectedRecipient(e.value)}
        />
        <InputStyled
          typeName="labeled-select"
          label="Entregador"
          type="text"
          width={100}
          options={options.deliverymen}
          onChange={(e) => setSelectedDeliveryman(e.value)}
        />
      </InputRow>

      <InputStyled
        typeName="label"
        label="Nome do produto"
        type="email"
        width={100}
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
    </EntityForm>
  );
}

export default DeliveriesSection;
