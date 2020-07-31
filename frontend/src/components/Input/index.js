import React from 'react';
import Proptypes from 'prop-types';
import { AiOutlineSearch, AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Input as InputStyled, Label, Form, SelectStyled } from './styles';

function Input({
  typeName = '',
  label = '',

  onSearch,
  labelWidth,
  ...props
}) {
  if (typeName === 'label') {
    return (
      <Label labelWidth={labelWidth}>
        {label}
        <InputStyled {...props} />
      </Label>
    );
  }

  if (typeName === 'search') {
    return (
      <Form
        onSubmit={(evt) => {
          evt.preventDefault();
          onSearch();
        }}
      >
        <InputStyled {...props} />

        <button type="submit">
          <AiOutlineSearch size={20} color="#FFF" />
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
