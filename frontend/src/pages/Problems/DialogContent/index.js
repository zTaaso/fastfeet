import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';

import Loading from '../../../components/Loading';

import { DialogContentStyled } from './styles';

import api from '../../../services/api';

function DialogContent({ id }) {
  const [problem, setProblem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProblem() {
      setLoading(true);
      const response = await api.get(`/problem/${id.problem}`);
      setLoading(false);
      setProblem(response.data);
    }
    getProblem();
  }, []);

  return (
    <DialogContentStyled>
      <div className={loading ? 'loading' : ''}>
        {loading ? <Loading size={30} color="#000" /> : problem.description}
      </div>
    </DialogContentStyled>
  );
}

export default DialogContent;

DialogContent.propTypes = {
  id: Proptypes.number.isRequired,
};
