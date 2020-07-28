import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import generateRandomColor from '../../utils/generateRandomColor';
import getAvatarUrl from '../../utils/getAvatarUrl';

import goToRegister from '../../utils/goToRegister';

import api from '../../services/api';

function DeliveryMen() {
  const history = useHistory();
  const [deliverymen, setDeliverymen] = useState([]);
  const [tableContent, setTableContent] = useState({
    headItems: ['ID', 'Foto', 'Nome', 'Email', 'Ações'],
    rows: [],
  });

  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function getDeliveryman() {
    await wait(2000);
  }

  async function getDeliverymen() {
    try {
      const response = await api.get('/deliveryman');
      setDeliverymen(response.data);
    } catch (err) {
      toast.error('Falha ao listar entregadores.');
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/deliveryman/${id}`, { params: { destroy: 'true' } });
      toast.success('Entregador deletado com sucesso.');
      getDeliverymen();
    } catch (err) {
      toast.error('Falha ao deletar entregador.');
    }
  }

  useEffect(() => {
    getDeliverymen();
  }, []);

  useEffect(() => {
    const rows = deliverymen.map((deliveryman) => {
      const formatedId = `#${deliveryman.id.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`;
      const { avatar } = deliveryman;

      return {
        id: deliveryman.id,
        formatedId,
        name: deliveryman.name,
        email: deliveryman.email,
        avatar_url: avatar
          ? avatar.url
          : getAvatarUrl(deliveryman.name, generateRandomColor()),
      };
    });
    setTableContent((prev) => ({ ...prev, rows }));
  }, [deliverymen]);

  return (
    <>
      <header>
        <h1> Gerenciando entregadores </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por entregadores"
            typeName="search"
            onSearch={getDeliveryman}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Entregador' }}
        category="deliverymen"
        handleDelete={handleDelete}
      />
    </>
  );
}

export default DeliveryMen;
