import React from 'react';

import { DialogContentStyled } from './styles';

function DialogContent() {
  return (
    <DialogContentStyled>
      <div>
        <h3>Endereço</h3>
        <p>Rua Jusciliana Narciso Campos</p>
        <p>Ibirité - Minas Gerais</p>
        <p>34550-3443</p>
      </div>

      <hr />

      <div>
        <h3>Datas</h3>
        <p>
          <strong>Retirada:</strong> 27/02/2003
        </p>
        <p>
          <strong>Entrega:</strong> 27/02/2003
        </p>
      </div>

      <hr />

      <div>
        <h3>Assinatura do destinatário</h3>

        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Lily_Collins%27_Signature.png"
            alt="Signature"
          />
        </div>
      </div>
    </DialogContentStyled>
  );
}

export default DialogContent;
