import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { AiOutlineSearch, AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Input as InputStyled, Label, Form, SelectStyled } from './styles';

function Input({ typeName = '', label = '', onSearch, labelWidth, ...props }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  if (typeName === 'label') {
    return (
      <Label labelWidth={labelWidth}>
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

  if (typeName === 'labeled-select') {
    return (
      <Label>
        {label}
        <SelectStyled {...props} />
      </Label>
    );
  }

  return <input {...props} />;
}

export default Input;

Input.propTypes = {
  typeName: Proptypes.string.isRequired,
  label: Proptypes.string,
  onSearch: Proptypes.func,
  labelWidth: Proptypes.number,
};

Input.defaultProps = {
  label: '',
  onSearch: () => {},
  labelWidth: 100,
};
