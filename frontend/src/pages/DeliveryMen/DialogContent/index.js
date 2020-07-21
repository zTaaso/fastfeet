import React from 'react';

import { DialogContentStyled } from './styles';

function DialogContent() {
  return (
    <DialogContentStyled>
      <div>
        <div>
          <img
            src="https://vignette.wikia.nocookie.net/naruto/images/b/b1/Naruto_Uzumaki_%28Infobox_Parte_II_B%29.png/revision/latest?cb=20160903113328&path-prefix=pt-br"
            alt=""
          />

          <h2>Naruto Uzumaki</h2>
        </div>
      </div>

      <hr />

      <div>
        <h3>Informações</h3>
        <p>
          <strong>ID:</strong> 27
        </p>
        <p>
          <strong>Email</strong> ztaaso@123.com
        </p>
      </div>
    </DialogContentStyled>
  );
}

export default DialogContent;
