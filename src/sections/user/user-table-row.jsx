import { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  role,
  handleClick,
}) {
  const [open, setOpen] = useState(null);



  return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>


        <TableCell>{role}</TableCell>


      

   
      </TableRow>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
};
