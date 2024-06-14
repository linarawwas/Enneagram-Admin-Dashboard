import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';
import { transformApiResponse } from './utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function TransitionsModal({ name, id }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [userResponses, setUserResponses] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (open) {
            fetchUserResponses(id);
        }
    }, [id, open]);

    const fetchUserResponses = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/answers/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user responses');
            }
            const data = await response.json();
            const transformedData = transformApiResponse(data);
            setUserResponses(transformedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    let modalContent;
    if (loading) {
        modalContent = 'Loading...';
    } else if (error) {
        modalContent = error;
    } else if (userResponses.length > 0) {
        modalContent = (
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Question</TableCell>
                                <TableCell>Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userResponses
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.questionText}</TableCell>
                                        <TableCell>{row.grade}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userResponses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
    } else {
        modalContent = 'No responses available';
    }

    return (
        <div>
            <Button onClick={handleOpen}>{name}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {name}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {modalContent}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

TransitionsModal.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};


export default function UserTableRow({ selected, name, role, id }) {
    return (
        <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox disableRipple checked={selected} />
            </TableCell>
            <TableCell component="th" scope="row" padding="none">
                <TransitionsModal name={name} id={id} />
            </TableCell>
            <TableCell>{role}</TableCell>
        </TableRow>
    );
}

UserTableRow.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
};
