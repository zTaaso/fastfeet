import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Table from '../../components/Table';
import NothingHere from '../../components/NothingHere';

import DialogContent from './DialogContent';

import api from '../../services/api';

function Problems() {
  const [loading, setLoading] = useState(false);

  const [problems, setProblems] = useState([]);
  const [hasProblems, setHasProblems] = useState(true);

  const [tableContent, setTableContent] = useState({
    headItems: ['Encomenda', 'Problema', 'Ações'],
    rows: [],
  });

  async function handleDelete(id) {
    if (window.confirm('Cancelar encomenda?')) {
      try {
        await api.delete(`/delivery/${id.delivery}`);
        toast.success('Encomenda cancelada com sucesso.');
      } catch (err) {
        toast.error('Falha ao cancelar encomenda.');
      }
    }
  }

  useEffect(() => {
    async function getProblems() {
      try {
        setLoading(true);
        const response = await api.get('/problems');
        setProblems(response.data);
        setLoading(false);
        setHasProblems(!!response.data[0]);
      } catch (err) {
        toast.error('Falha ao listar problemas.');
      }
    }
    getProblems();
  }, []);

  useEffect(() => {
    const rows = problems.map((problem) => {
      const formatedDeliveryId = `#${problem.delivery_id.toLocaleString(
        'en-US',
        {
          minimumIntegerDigits: 2,
        }
      )}`;

      return {
        id: problem.id,
        delivery_id: problem.delivery_id,
        formatedDeliveryId,
        description: problem.description,
      };
    });

    setTableContent((prev) => ({ ...prev, rows }));
  }, [problems]);

  return (
    <>
      <header>
        <h1> Problemas na entrega </h1>
      </header>

      {hasProblems ? (
        <Table
          headItems={tableContent.headItems}
          bodyRows={tableContent.rows}
          dialog={{ Component: DialogContent, title: 'Problema na entrega' }}
          category="problems"
          handleDelete={handleDelete}
          loading={loading}
          optionsList={[
            { key: 'view', label: 'Visualizar' },

            { key: 'delete', label: 'Cancelar encomenda' },
          ]}
        />
      ) : (
        <NothingHere>Ainda não há problemas.</NothingHere>
      )}
    </>
  );
}

export default Problems;
