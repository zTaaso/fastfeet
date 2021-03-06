import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';

import Loading from '../../../components/Loading';

import { DialogContentStyled } from './styles';

import api from '../../../services/api';

function DialogContent({ id }) {
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState({});

  useEffect(() => {
    async function getRecipient() {
      setLoading(true);
      const response = await api.get(`/recipients/${id}`);

      setLoading(false);
      setRecipient(response.data);
    }
    getRecipient();
  }, []);

  return (
    <DialogContentStyled>
      {loading ? (
        <div className="loading">
          <Loading size={30} color="#000" />
        </div>
      ) : (
        <>
          <div>
            <div>
              <h3>{recipient.name}</h3>
            </div>
          </div>

          <hr />

          <div>
            <h3>Informações</h3>
            <p>
              <strong>ID:</strong> {recipient.id}
            </p>
            <p>
              <strong>Rua:</strong> {recipient.street}
            </p>
            <p>
              <strong>Número:</strong> {recipient.number}
            </p>
            <p>
              <strong>Complemento:</strong> {recipient.complement}
            </p>
            <p>
              <strong>Cidade:</strong> {recipient.city}
            </p>
            <p>
              <strong>Estado:</strong> {recipient.state}
            </p>
            <p>
              <strong>CEP:</strong> {recipient.zip}
            </p>
          </div>
        </>
      )}
    </DialogContentStyled>
  );
}

export default DialogContent;

DialogContent.propTypes = {
  id: Proptypes.number.isRequired,
};
