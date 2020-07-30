import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Loading from '../../../components/Loading';

import { DialogContentStyled } from './styles';

import api from '../../../services/api.js';

import getAvatarUrl from '../../../utils/getAvatarUrl';
import generateRandomColor from '../../../utils/generateRandomColor';

function DialogContent({ id }) {
  const [loading, setLoading] = useState(true);

  const [deliveryman, setDeliveryman] = useState({});
  const [avatarURL, setAvatarURL] = useState('');
  const [registerDate, setRegisterDate] = useState('');

  useEffect(() => {
    async function getDeliveryman() {
      setLoading(true);
      const response = await api.get(`/deliveryman/${id}`);
      const deliverymanData = response.data;

      const url = deliverymanData.avatar_id
        ? deliverymanData.avatar.url
        : getAvatarUrl(deliverymanData.name, generateRandomColor());

      const formatedDate = format(parseISO(deliverymanData.createdAt), 'P', {
        locale: pt,
      });

      setLoading(false);
      setDeliveryman(deliverymanData);
      setAvatarURL(url);
      setRegisterDate(formatedDate);
    }
    getDeliveryman();
  }, []);

  return (
    <DialogContentStyled>
      {loading ? (
        <div className="loading">
          <Loading color="#000" size={30} />
        </div>
      ) : (
        <>
          <div>
            <div>
              <img src={avatarURL} alt="" />

              <h2>{deliveryman.name}</h2>
            </div>
          </div>

          <hr />

          <div>
            <h3>Informações</h3>
            <p>
              <strong>ID:</strong> {deliveryman.id}
            </p>
            <p>
              <strong>Email:</strong> {deliveryman.email}
            </p>
            <p>
              <strong>Entrou em:</strong> {registerDate}
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
