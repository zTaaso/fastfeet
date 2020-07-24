import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDone } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import { Container, Content } from './styles';

function EntityForm({ title, children }) {
  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <section>
        <h1>{title}</h1>

        <div>
          <button id="back" type="button" onClick={handleGoBack}>
            <IoIosArrowBack size={20} color="#fff" />
            Voltar
          </button>
          <button id="save" type="button">
            <MdDone size={20} color="#fff" />
            Salvar
          </button>
        </div>
      </section>

      <Content>{children}</Content>
    </Container>
  );
}

export default EntityForm;
