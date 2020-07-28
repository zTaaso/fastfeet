import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import goToRegister from '../../utils/goToRegister';

import api from '../../services/api';

function Recipients() {
  const history = useHistory();

  const [recipients, setRecipients] = useState([]);
  const [tableContent, setTableContent] = useState({
    headItems: ['ID', 'Nome', 'Endereço', 'Ações'],
  });

  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function getRecipient() {
    await wait(2000);
  }

  async function getRecipients() {
    try {
      const response = await api.get('/recipients');
      setRecipients(response.data);
    } catch (err) {
      toast.error('Falha ao listar destinatários.');
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`, { params: { destroy: 'true' } });
      toast.success('Destinatário deletado com sucesso.');
      getRecipients();
    } catch (err) {
      toast.error('Falha ao deletar destinatário.');
    }
  }

  useEffect(() => {
    getRecipients();
  }, []);

  useEffect(() => {
    const rows = recipients.map((recipient) => {
      const formatedId = `#${recipient.id.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })}`;

      return {
        id: recipient.id,
        formatedId,
        name: recipient.name,
        adress: `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state} `,
      };
    });

    setTableContent((prev) => ({ ...prev, rows }));
  }, [recipients]);

  return (
    <>
      <header>
        <h1> Gerenciando destinatários </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por destinatários"
            typeName="search"
            onSearch={getRecipient}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Destinatário' }}
        category="recipients"
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Recipients;
