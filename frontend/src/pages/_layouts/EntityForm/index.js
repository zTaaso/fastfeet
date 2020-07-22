import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { MdDone } from 'react-icons/md';

import { Container, Content } from './styles';

function EntityForm({ title, children }) {
  return (
    <Container>
      <section>
        <h1>{title}</h1>

        <div>
          <button id="back" type="button">
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
