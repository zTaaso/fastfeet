import React from 'react';

import { Label } from './styles';

function StatusLabel({ children, category }) {
  return (
    <>
      <Label className={category}>
        <div />
        {children}
      </Label>
    </>
  );
}

export default StatusLabel;
