import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export default function UserTableRow({ selected, name, role, id }) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell>{role}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.any.isRequired,
  role: PropTypes.any.isRequired,
  selected: PropTypes.bool.isRequired,
};
