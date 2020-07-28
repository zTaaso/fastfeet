import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { InputStyled, InputRow, ButtonRow } from './styles';

import EntityForm from '../_layouts/EntityForm';

import api from '../../services/api';

function DeliveriesSection({ match }) {
  const history = useHistory();
  const deliveryId = match.params.id;

  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState({});
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState({});

  const [product, setProduct] = useState('');

  const [options, setOptions] = useState({ recipients: [], deliverymen: [] });

  const status = history.location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  async function handleSave() {
    try {
      if (status === 'Cadastro') {
        await api.post('/delivery', {
          recipient_id: selectedRecipient.value,
          deliveryman_id: selectedDeliveryman.value,
          product,
        });
      } else {
        await api.put(`/delivery/${deliveryId}`, {
          recipient_id: selectedRecipient.value,
          deliveryman_id: selectedDeliveryman.value,
          product,
        });
      }

      toast.success('Encomenda salva com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error('Algo deu errado na criação da entrega.');
    }
  }

  async function handleCancel() {
    const confirmation = window.confirm('Cancelar encomenda?');
    if (confirmation) {
      await api.delete(`delivery/${deliveryId}`);
      toast.success('Encomenda cancelada com sucesso!');
      history.goBack();
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
    async function getDelivery(id) {
      const response = await api.get(`delivery/${id}`);
      const delivery = response.data;
      setSelectedDeliveryman({
        label: delivery.deliveryman.name,
        value: delivery.deliveryman.id,
      });
      setSelectedRecipient({
        label: delivery.recipient.name,
        value: delivery.recipient.id,
      });
      setProduct(delivery.product);
    }

    if (status === 'Edição') {
      getDelivery(deliveryId);
    }
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
    <EntityForm title={`${status} de encomendas`} onSave={handleSave}>
      <InputRow>
        <InputStyled
          typeName="labeled-select"
          label="Destinatário"
          type="text"
          width={95}
          options={options.recipients}
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e)}
        />
        <InputStyled
          typeName="labeled-select"
          label="Entregador"
          type="text"
          width={100}
          options={options.deliverymen}
          value={selectedDeliveryman}
          onChange={(e) => setSelectedDeliveryman(e)}
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

      {status === 'Edição' && (
        <ButtonRow>
          <button type="button" onClick={handleCancel}>
            Cancelar encomenda
            <AiOutlineClose color="#fff" size={20} />
          </button>
        </ButtonRow>
      )}
    </EntityForm>
  );
}

export default DeliveriesSection;

DeliveriesSection.propTypes = {
  match: Proptypes.shape({
    params: { id: Proptypes.number },
  }),
};

DeliveriesSection.defaultProps = {
  match: {
    params: { id: null },
  },
};
