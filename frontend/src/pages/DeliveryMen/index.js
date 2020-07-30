import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import NothingHere from '../../components/NothingHere';
import DialogContent from './DialogContent';

import generateRandomColor from '../../utils/generateRandomColor';
import getAvatarUrl from '../../utils/getAvatarUrl';

import goToRegister from '../../utils/goToRegister';

import api from '../../services/api';

function DeliveryMen() {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [deliverymen, setDeliverymen] = useState([]);
  const [hasDeliverymen, setHasDeliverymen] = useState(true);

  const [tableContent, setTableContent] = useState({
    headItems: ['ID', 'Foto', 'Nome', 'Email', 'Ações'],
    rows: [],
  });

  async function getDeliverymen() {
    try {
      setLoading(true);

      const response = await api.get('/deliveryman', {
        params: { q: searchValue },
      });
      setDeliverymen(response.data);
      setLoading(false);

      setHasDeliverymen(!!response.data[0]);
    } catch (err) {
      toast.error('Falha ao listar entregadores.');
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Deletar registro permanentemente?')) {
      try {
        await api.delete(`/deliveryman/${id}`, { params: { destroy: 'true' } });
        toast.success('Entregador deletado com sucesso.');
        getDeliverymen();
      } catch (err) {
        toast.error('Falha ao deletar entregador.');
      }
    }
  }

  useEffect(() => {
    getDeliverymen();
  }, [searchValue]);

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
            onSearch={getDeliverymen}
            loading={loading}
            onChange={(evt) => setSearchValue(evt.target.value)}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      {hasDeliverymen ? (
        <Table
          headItems={tableContent.headItems}
          bodyRows={tableContent.rows}
          dialog={{ Component: DialogContent, title: 'Entregador' }}
          category="deliverymen"
          handleDelete={handleDelete}
          loading={loading}
          optionsList={[
            { key: 'view', label: 'Visualizar' },
            { key: 'edit', label: 'Editar' },
            { key: 'delete', label: 'Excluir' },
          ]}
        />
      ) : (
        <NothingHere>Nenhum entregador foi encontrado.</NothingHere>
      )}
    </>
  );
}

export default DeliveryMen;
