import React, { useState, useEffect } from 'react';

// import { Container } from './styles';

import { useHistory } from 'react-router-dom';
import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import generateRandomColor from '../../utils/generateRandomColor';
import goToRegister from '../../utils/goToRegister';
import getAvatarUrl from '../../utils/getAvatarUrl';

import api from '../../services/api';

function Deliveries() {
  const history = useHistory();

  const [deliveries, setDeliveries] = useState([]);
  const [tableContent, setTableContent] = useState({
    headItems: [
      'ID',
      'Destinatário',
      'Entregador',
      'Cidade',
      'Estado',
      'Status',
      'Ações',
    ],
    rows: [],
  });

  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function searchDelivery() {
    await wait(2000);
  }

  useEffect(() => {
    async function getDeliveries() {
      const response = await api.get('/delivery');

      setDeliveries(response.data);
    }
    getDeliveries();
  }, []);

  useEffect(() => {
    const rows = deliveries.map((delivery) => {
      const deliveryman_avatar = delivery.deliveryman.avatar.url;
      const deliveryman_name = delivery.deliveryman.name;

      const formatedId = `#${delivery.id.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`;

      return {
        id: formatedId,
        recipient: delivery.recipient.name,
        deliveryman: {
          name: deliveryman_name,
          avatar_url:
            deliveryman_avatar ||
            getAvatarUrl(deliveryman_name, generateRandomColor()),
        },
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        status: { category: 'delivered', label: 'Entregue' },
      };
    });

    setTableContent((value) => ({ ...value, rows }));
  }, [deliveries]);

  return (
    <>
      <header>
        <h1> Gerenciando encomendas </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por encomendas"
            typeName="search"
            onSearch={searchDelivery}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Informações da encomenda' }}
        category="deliveries"
      />
    </>
  );
}

export default Deliveries;
