import React from 'react';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import goToRegister from '../../utils/goToRegister';

function Recipients() {
  const history = useHistory();

  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function getRecipients() {
    await wait(2000);
  }

  const tableContent = {
    headItems: ['ID', 'Nome', 'Endereço', 'Ações'],
    rows: [
      {
        id: 1,
        name: 'Thiago Afonso',
        adress: 'Rua jusciliana narciso campos',
      },
      {
        id: 1,
        name: 'Thiago Afonso',
        adress: 'Rua jusciliana narciso campos',
      },
      {
        id: 1,
        name: 'Thiago Afonso',
        adress: 'Rua jusciliana narciso campos',
      },
      {
        id: 1,
        name: 'Thiago Afonso',
        adress: 'Rua jusciliana narciso campos',
      },
    ],
  };

  return (
    <>
      <header>
        <h1> Gerenciando destinatários </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por destinatários"
            typeName="search"
            onSearch={getRecipients}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Destinatário' }}
        category="recipients"
      />
    </>
  );
}

export default Recipients;
