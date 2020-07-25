import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsThreeDots, BsFillTrashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import { ActionButton, Options, Button } from './styles';

import Dialog from '../Dialog';

function ActionsBtn({ data, dialog }) {
  const history = useHistory();

  const [isToggled, setIsToggled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleViewClick() {
    setIsDialogOpen(true);
  }

  function handleEditClick() {
    history.push(`${history.location.pathname}/1/form`);
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
        title={dialog.title}
        handleClose={() => setIsDialogOpen(false)}
      >
        <dialog.Component />
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
          <Button onClick={handleEditClick}>
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
