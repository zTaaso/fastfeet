import React from 'react';

import { DialogContentStyled } from './styles';

function DialogContent() {
  return (
    <DialogContentStyled>
      <div>
        <div>
          <h3>Naruto Uzumaki</h3>
        </div>
      </div>

      <hr />

      <div>
        <h3>Informações</h3>
        <p>
          <strong>ID:</strong> 27
        </p>
        <p>
          <strong>Rua:</strong> Jusciliana Narsciso Campos
        </p>
        <p>
          <strong>Número:</strong> 940
        </p>
        <p>
          <strong>Complemento:</strong> Esquina
        </p>
        <p>
          <strong>Cidade:</strong> Ibirité
        </p>
        <p>
          <strong>Estado:</strong> Minas Gerais
        </p>
        <p>
          <strong>CEP:</strong> 12345678
        </p>
      </div>
    </DialogContentStyled>
  );
}

export default DialogContent;
