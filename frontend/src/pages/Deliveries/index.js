import React from 'react';

// import { Container } from './styles';

import Table from '../../components/Table';
import Input from '../../components/Input';

function Deliveries() {
  const tableContent = {
    headItems: [
      'ID',
      'Destinatário',
      'Entregador',
      'Cidade',
      'Estado',
      'Status',
      'Ações',
    ],
    rows: [
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'João Doe',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: 'Entregue',
        actions: '...',
      },
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'João Doe',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: 'Entregue',
        actions: '...',
      },
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'João Doe',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: 'Entregue',
        actions: '...',
      },
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'João Doe',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: 'Entregue',
        actions: '...',
      },
    ],
  };

  return (
    <>
      <header>
        <h1> Gerenciando encomendas </h1>

        <Input
          type="text"
          placeholder="Buscar por encomendas"
          typeName="search"
          onSearch={() => {}}
        />
      </header>

      <Table headItems={tableContent.headItems} bodyRows={tableContent.rows} />
    </>
  );
}

export default Deliveries;
