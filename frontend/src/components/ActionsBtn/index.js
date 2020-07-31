import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BsThreeDots, BsFillTrashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import Dialog from '../Dialog';

import { ActionButton, Options, Button } from './styles';

function ActionsBtn({ id, dialog, handleDelete, optionsList = [] }) {
  const history = useHistory();

  const [isToggled, setIsToggled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enabledOptions, setEnabledOptions] = useState([]);

  const toggleProps = {
    onMouseOver: () => {
      setIsToggled(true);
    },
    onMouseOut: () => {
      setIsToggled(false);
    },
  };

  function handleViewClick() {
    setIsDialogOpen(true);
  }

  function handleEditClick() {
    history.push(`${history.location.pathname}/${id}/form`);
  }

  function handleDeleteClick() {
    handleDelete(id);
  }

  const options = [
    {
      name: 'view',
      Component: ({ children }) => (
        <li>
          <Button onClick={handleViewClick}>
            <AiFillEye size={15} color="#8E5BE8" />
            <span>{children}</span>
          </Button>
        </li>
      ),
    },
    {
      name: 'edit',
      Component: ({ children }) => (
        <li>
          <Button onClick={handleEditClick}>
            <MdEdit size={15} color="#4D85EE" />
            <span>{children}</span>
          </Button>
        </li>
      ),
    },
    {
      name: 'delete',
      Component: ({ children }) => (
        <li>
          <Button onClick={handleDeleteClick}>
            <BsFillTrashFill size={15} color="#DE3B3B" />
            <span>{children}</span>
          </Button>
        </li>
      ),
    },
  ];

  useEffect(() => {
    const enabled = options
      .map((opt) => {
        const option = optionsList.find((op) => op.key === opt.name);

        if (option) {
          return {
            ...opt,
            label: option.label,
          };
        }

        return opt;
      })
      .filter((opt) => {
        const isEnabled = optionsList.find((option) => option.key === opt.name);

        return !!isEnabled;
      });

    setEnabledOptions(enabled);
  }, []);

  return (
    <ActionButton>
      <BsThreeDots
        size={20}
        color="#C6C6C6"
        // onClick={handleActionsClick}
        onClick={() => {
          setIsToggled(!isToggled);
        }}
        {...toggleProps}
      />

      <Dialog
        open={isDialogOpen}
        title={dialog.title}
        handleClose={() => setIsDialogOpen(false)}
      >
        <dialog.Component id={id} />
      </Dialog>

      <Options visible={isToggled} {...toggleProps}>
        {enabledOptions.map((Opt) => (
          <Opt.Component key={Opt.label}>{Opt.label}</Opt.Component>
        ))}
      </Options>
    </ActionButton>
  );
}

export default ActionsBtn;
