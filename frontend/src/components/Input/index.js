import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { AiOutlineSearch, AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Input as InputStyled, Label, Form } from './styles';

function Input({ typeName = '', label = '', onSearch, ...props }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  if (typeName === 'label') {
    return (
      <Label htmlFor={props.id}>
        {label}
        <InputStyled {...props} />
      </Label>
    );
  }

  if (typeName === 'search') {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      await onSearch(value);
      setLoading(false);
    };

    return (
      <Form onSubmit={handleSubmit} loading={loading}>
        <InputStyled
          {...props}
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
        />

        <button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters size={20} color="FFF" />
          ) : (
            <AiOutlineSearch size={20} color="#FFF" />
          )}
        </button>
      </Form>
    );
  }

  return <input {...props} />;
}

export default Input;

Input.propTypes = {
  typeName: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  onSearch: Proptypes.func.isRequired,
  id: Proptypes.string.isRequired,
};
