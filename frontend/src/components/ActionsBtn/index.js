import React, { useState, useRef } from 'react';
import { BsThreeDots, BsFillTrashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import { ActionButton, Options, Button } from './styles';

import Dialog from '../Dialog';

function ActionsBtn({ data, dialog: DialogContent }) {
  const [isToggled, setIsToggled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const divref = useRef();
  const divsla = <div>seu cú</div>;

  function handleViewClick() {
    setIsDialogOpen(true);
  }

  return (
    <ActionButton>
      <BsThreeDots
        size={20}
        color="#C6C6C6"
        // onClick={handleActionsClick}
        onClick={() => {
          setIsToggled(!isToggled);
        }}
        onMouseOver={() => {
          setIsToggled(true);
        }}
        onMouseOut={() => {
          setIsToggled(false);
        }}
      />

      <Dialog
        open={isDialogOpen}
        title="Informações da encomenda"
        handleClose={() => setIsDialogOpen(false)}
      >
        <DialogContent />
      </Dialog>

      <Options
        visible={isToggled}
        onMouseOver={() => {
          setIsToggled(true);
        }}
        onMouseOut={() => {
          setIsToggled(false);
        }}
      >
        <li>
          <Button onClick={handleViewClick}>
            <AiFillEye size={15} color="#8E5BE8" />
            <span>Visualizar</span>
          </Button>
        </li>
        <li>
          <Button>
            <MdEdit size={15} color="#4D85EE" />
            <span>Editar</span>
          </Button>
        </li>
        <li>
          <Button>
            <BsFillTrashFill size={15} color="#DE3B3B" />
            <span>Excluir</span>
          </Button>
        </li>
      </Options>
    </ActionButton>
  );
}

export default ActionsBtn;
