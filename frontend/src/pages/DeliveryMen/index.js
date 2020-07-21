import React from 'react';

import Table from '../../components/Table';
import Input from '../../components/Input';
import RegisterButton from '../../components/RegisterButton';
import DialogContent from './DialogContent';

import generateRandomColor from '../../utils/generateRandomColor';

function DeliveryMen() {
  const wait = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('pesquisa completa');
      }, ms);
    });

  async function getDeliveryman() {
    await wait(2000);
  }

  const tableContent = {
    headItems: ['ID', 'Foto', 'Nome', 'Email', 'Ações'],
    rows: [
      {
        id: 1,
        img:
          'https://vignette.wikia.nocookie.net/naruto/images/b/b1/Naruto_Uzumaki_%28Infobox_Parte_II_B%29.png/revision/latest?cb=20160903113328&path-prefix=pt-br',
        name: 'Thiago Afonso',
        email: 'ztaaso123@gmail.com',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 1,
        img: '',
        name: 'Thiago Santos',
        email: 'ztaaso123@gmail.com',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 1,
        img:
          'https://vignette.wikia.nocookie.net/naruto/images/b/b1/Naruto_Uzumaki_%28Infobox_Parte_II_B%29.png/revision/latest?cb=20160903113328&path-prefix=pt-br',
        name: 'Naruto Uzumaki',
        email: 'ztaaso123@gmail.com',
        avatar: { color: generateRandomColor() },
      },
      {
        id: 1,
        img:
          'https://vignette.wikia.nocookie.net/naruto/images/b/b1/Naruto_Uzumaki_%28Infobox_Parte_II_B%29.png/revision/latest?cb=20160903113328&path-prefix=pt-br',
        name: 'Thiago Afonso',
        email: 'ztaaso123@gmail.com',
        avatar: { color: generateRandomColor() },
      },
    ],
  };

  return (
    <>
      <header>
        <h1> Gerenciando entregadores </h1>

        <div>
          <Input
            type="text"
            placeholder="Buscar por entregadores"
            typeName="search"
            onSearch={getDeliveryman}
          />

          <RegisterButton />
        </div>
      </header>

      <Table
        headItems={tableContent.headItems}
        bodyRows={tableContent.rows}
        dialog={{ Component: DialogContent, title: 'Entregador' }}
        category="deliverymen"
      />
    </>
  );
}

export default DeliveryMen;
