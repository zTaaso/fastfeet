import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import NothingHere from '../../components/NothingHere';
import DialogContent from './DialogContent';
import ProblemsFilter from './components/ProblemsFilter';

import generateRandomColor from '../../utils/generateRandomColor';
import goToRegister from '../../utils/goToRegister';
import getAvatarUrl from '../../utils/getAvatarUrl';

import api from '../../services/api';

function Deliveries() {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const [problemsFilter, setProblemsFilter] = useState(false);

  const [deliveries, setDeliveries] = useState([]);
  const [hasDeliveries, setHasDeliveries] = useState(true);
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

  async function getDeliveries() {
    setLoading(true);

    try {
      const response = await api.get('/delivery', {
        params: { q: searchValue, withProblem: problemsFilter.toString() },
      });
      setDeliveries(response.data);
      setHasDeliveries(!!response.data[0]);
    } catch (err) {
      toast.error('Falha ao buscar encomendas.');
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm('Deletar registro permanentemente?')) {
      try {
        await api.delete(`/delivery/${id}`, { params: { destroy: 'true' } });
        toast.success('Encomenda deletada com sucesso.');
        getDeliveries();
      } catch (err) {
        toast.error('Falha ao deletar encomenda.');
      }
    }
  }

  useEffect(() => {
    getDeliveries();
  }, [problemsFilter, searchValue]);

  useEffect(() => {
    const rows = deliveries.map((delivery) => {
      const deliveryman_avatar = delivery.deliveryman.avatar.url;
      const deliveryman_name = delivery.deliveryman.name;

      const formatedId = `#${delivery.id.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`;

      let label = '';
      switch (delivery.status) {
        case 'delivered':
          label = 'entregue';
          break;
        case 'pending':
          label = 'pendente';
          break;
        case 'retired':
          label = 'retirada';
          break;
        case 'canceled':
          label = 'cancelada';
          break;
        default:
          label = '';
      }

      return {
        id: delivery.id,
        formatedId,
        recipient: delivery.recipient.name,
        deliveryman: {
          name: deliveryman_name,
          avatar_url:
            deliveryman_avatar ||
            getAvatarUrl(deliveryman_name, generateRandomColor()),
        },
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        status: { category: delivery.status, label },
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
            onSearch={getDeliveries}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      {hasDeliveries ? (
        <Table
          headItems={tableContent.headItems}
          bodyRows={tableContent.rows}
          loading={loading}
          dialog={{
            Component: DialogContent,
            title: 'Informações da encomenda',
          }}
          category="deliveries"
          handleDelete={handleDelete}
          optionsList={[
            { key: 'view', label: 'Visualizar' },
            { key: 'edit', label: 'Editar' },
            { key: 'delete', label: 'Excluir' },
          ]}
        />
      ) : (
        <NothingHere>Nenhuma encomenda foi encontrada.</NothingHere>
      )}

      <ProblemsFilter
        enabled={problemsFilter}
        onClick={() => setProblemsFilter(!problemsFilter)}
      />
    </>
  );
}

export default Deliveries;
