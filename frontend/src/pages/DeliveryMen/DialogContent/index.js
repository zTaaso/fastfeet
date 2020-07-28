import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { DialogContentStyled } from './styles';

import api from '../../../services/api.js';

import getAvatarUrl from '../../../utils/getAvatarUrl';
import generateRandomColor from '../../../utils/generateRandomColor';

function DialogContent({ id }) {
  const [deliveryman, setDeliveryman] = useState({});
  const [avatarURL, setAvatarURL] = useState('');
  const [registerDate, setRegisterDate] = useState('');

  useEffect(() => {
    async function getDeliveryman() {
      const response = await api.get(`/deliveryman/${id}`);
      const deliverymanData = response.data;

      const url = deliverymanData.avatar_id
        ? deliverymanData.avatar.url
        : getAvatarUrl(deliverymanData.name, generateRandomColor());

      const formatedDate = format(parseISO(deliverymanData.createdAt), 'P', {
        locale: pt,
      });

      setDeliveryman(deliverymanData);
      setAvatarURL(url);
      setRegisterDate(formatedDate);
    }
    getDeliveryman();
  }, []);

  return (
    <DialogContentStyled>
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
    </DialogContentStyled>
  );
}

export default DialogContent;
