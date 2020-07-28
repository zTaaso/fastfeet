import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { FaRegSadTear } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import api from '../../../services/api';

import { DialogContentStyled } from './styles';

function DialogContent({ id }) {
  const [delivery, setDelivery] = useState({});
  const [loading, setLoading] = useState(true);
  const [formatedDates, setFormatedDates] = useState({});

  const hasSignature = false;

  useEffect(() => {
    async function getDelivery() {
      const response = await api.get(`delivery/${id}`);

      const formatingDates = {
        created: format(parseISO(response.data.createdAt), 'Pp', {
          locale: pt,
        }),
        retired:
          (response.data.start_date &&
            format(parseISO(response.data.start_date), 'Pp', {
              locale: pt,
            })) ||
          'Pendente',
        delivered:
          (response.data.end_date &&
            format(parseISO(response.data.end_date), 'Pp', {
              locale: pt,
            })) ||
          'Pendente',
      };

      setDelivery(response.data);
      setFormatedDates(formatingDates);
      setLoading(false);
      console.log({ id, response: response.data });
    }
    getDelivery();
  }, []);

  return (
    <DialogContentStyled>
      {loading ? (
        <div className="loading">
          <AiOutlineLoading3Quarters color="#000" size={30} />
        </div>
      ) : (
        <>
          <div className="product">
            <strong>Produto: </strong> {delivery.product}
          </div>

          <hr />

          <div>
            <h3>Endereço</h3>
            <p>{delivery.recipient.street}</p>
            <p>{`${delivery.recipient.city} -  ${delivery.recipient.state}`}</p>
            <p>{delivery.recipient.zip}</p>
          </div>

          <hr />

          <div>
            <h3>Datas</h3>
            <p>
              <strong>Criado em:</strong> {formatedDates.created}
            </p>
            <p>
              <strong>Retirada:</strong> {formatedDates.retired}
            </p>
            <p>
              <strong>Entrega:</strong> {formatedDates.delivered}
            </p>
          </div>

          <hr />

          <div>
            <h3>Assinatura do destinatário</h3>

            <div>
              {hasSignature ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Lily_Collins%27_Signature.png"
                  alt="Signature"
                />
              ) : (
                <>
                  <h4> Não há assinatura para esta encomenda </h4>
                  <FaRegSadTear color="#000" size={30} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </DialogContentStyled>
  );
}

export default DialogContent;
