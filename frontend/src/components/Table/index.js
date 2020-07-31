import React, { useState } from 'react';
import Proptypes from 'prop-types';

import { Table as TableStyled } from './styles';

import StatusLabel from './components/StatusLabel';
import ClassifyRows from './components/ClassifiedRows';
import Loading from '../Loading';
import ActionsBtn from '../ActionsBtn';

function Table({
  headItems = [],
  bodyRows = [],
  dialog,
  category,
  handleDelete,
  optionsList,
  loading = true,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const components = {
    StatusLabel: { Component: StatusLabel },
    ActionsBtn: {
      Component: ActionsBtn,
      props: { dialog, handleDelete, optionsList },
    },
  };

  const focusProps = {
    onMouseOver: () => {
      setIsFocused(true);
    },
    onMouseOut: () => {
      setIsFocused(false);
    },
  };

  return (
    <TableStyled {...focusProps} focused={isFocused}>
      {loading ? (
        <Loading className="loading" size={50} color="#7d40e7" />
      ) : (
        <table {...props}>
          <thead>
            <tr>
              {headItems.map((i) => (
                <th key={i}>{i}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <ClassifyRows
              rows={bodyRows}
              category={category}
              components={components}
            />
          </tbody>
        </table>
      )}
    </TableStyled>
  );
}

export default Table;

Table.propTypes = {
  headItems: Proptypes.arrayOf(Proptypes.string).isRequired,
  bodyRows: Proptypes.arrayOf(Proptypes.object).isRequired,
  dialog: Proptypes.shape({
    Component: Proptypes.func,
    title: Proptypes.string,
  }).isRequired,
  category: Proptypes.string.isRequired,
  handleDelete: Proptypes.func.isRequired,
  optionsList: Proptypes.arrayOf(
    Proptypes.shape({
      key: Proptypes.string,
      label: Proptypes.string,
    })
  ).isRequired,
};
