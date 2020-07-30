import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import NothingHere from '../../components/NothingHere';
import DialogContent from './DialogContent';

import goToRegister from '../../utils/goToRegister';

import api from '../../services/api';

function Recipients() {
  const history = useHistory();

  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const [recipients, setRecipients] = useState([]);
  const [hasRecipients, setHasRecipients] = useState(true);

  const [tableContent, setTableContent] = useState({
    headItems: ['ID', 'Nome', 'Endereço', 'Ações'],
  });

  async function getRecipients() {
    try {
      setLoading(true);

      const response = await api.get('/recipients', {
        params: { q: searchValue },
      });
      setRecipients(response.data);
      setLoading(false);

      setHasRecipients(!!response.data[0]);
    } catch (err) {
      toast.error('Falha ao listar destinatários.');
    }
  }

  async function handleDelete(id) {
    if (window.confirm('Deletar registro permanentemente?')) {
      try {
        await api.delete(`/recipients/${id}`, { params: { destroy: 'true' } });
        toast.success('Destinatário deletado com sucesso.');
        getRecipients();
      } catch (err) {
        toast.error('Falha ao deletar destinatário.');
      }
    }
  }

  useEffect(() => {
    getRecipients();
  }, [searchValue]);

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
            onSearch={getRecipients}
            loading={loading}
            onChange={(evt) => setSearchValue(evt.target.value)}
          />

          <RegisterButton onClick={() => goToRegister(history)} />
        </div>
      </header>

      {hasRecipients ? (
        <Table
          headItems={tableContent.headItems}
          bodyRows={tableContent.rows}
          dialog={{ Component: DialogContent, title: 'Destinatário' }}
          category="recipients"
          handleDelete={handleDelete}
          loading={loading}
          optionsList={[
            { key: 'view', label: 'Visualizar' },
            { key: 'edit', label: 'Editar' },
            { key: 'delete', label: 'Excluir' },
          ]}
        />
      ) : (
        <NothingHere>Nenhum destinatário foi encontrado.</NothingHere>
      )}
    </>
  );
}

export default Recipients;
