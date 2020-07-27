import React, { useState, useEffect } from 'react';

import Table from '../../components/Table';
import DialogContent from './DialogContent';

import api from '../../services/api';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [tableContent, setTableContent] = useState({
    headItems: ['Encomenda', 'Problema', 'Ações'],
    rows: [],
  });

  useEffect(() => {
    async function getProblems() {
      const response = await api.get('/problems');
      setProblems(response.data);
    }
    getProblems();
  }, []);

  useEffect(() => {
    const rows = problems.map((problem) => {
      const formatedId = `#${problem.delivery_id.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`;

      return {
        delivery_id: formatedId,
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

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Problema na entrega' }}
        category="problems"
      />
    </>
  );
}

export default Problems;
