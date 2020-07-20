import React from 'react';

// import { Container } from './styles';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import generateRandomColor from '../../utils/generateRandomColor';

function Deliveries() {
  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function getDelivery() {
    await wait(2000);
  }

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
        status: { category: 'delivered', label: 'Entregue' },
        actions: '...',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 2,
        recipient: 'Thiago Afonso',
        deliveryman: 'Corno Manso',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: { category: 'pending', label: 'Pendente' },
        actions: '...',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'Lívia Santos',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: { category: 'retired', label: 'Retirada' },
        actions: '...',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 1,
        recipient: 'Thiago Afonso',
        deliveryman: 'João Doe',
        city: 'Ibirité',
        state: 'Minas Gerais',
        status: { category: 'canceled', label: 'Cancelada' },
        actions: '...',
        avatar: { color: generateRandomColor() },
      },
    ],
  };

  return (
    <>
      <header>
        <h1> Gerenciando encomendas </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por encomendas"
            typeName="search"
            onSearch={getDelivery}
          />

          <RegisterButton />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={DialogContent}
      />
    </>
  );
}

export default Deliveries;
