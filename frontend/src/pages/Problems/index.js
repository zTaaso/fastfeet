import React from 'react';

import Table from '../../components/Table';
import DialogContent from './DialogContent';

function Problems() {
  const tableContent = {
    headItems: ['Encomenda', 'Problema', 'Ações'],
    rows: [
      {
        id: 1,
        problem:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 1,
        problem: 'Destiinatário ausente',
      },
      {
        id: 1,
        problem: 'Destiinatário ausente',
      },
      {
        id: 1,
        problem: 'Destiinatário ausente',
      },
    ],
  };

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
