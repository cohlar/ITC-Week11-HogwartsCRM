import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ViewIcon, EditIcon, DeleteIcon } from './Icons.js'
import { formatDatetime } from '../lib/utils.js'

function StudentsList(props) {
    const { students, onDeleteHandler } = props;

    const StyledTableCell = withStyles(theme => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }))(TableRow);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="student-list">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 80 }}>First Name</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 80 }}>Last Name</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 140 }}>Created (UTC)</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 140 }}>Last Updated (UTC)</StyledTableCell>
                        <StyledTableCell style={{ minWidth: 110 }} align='center'>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map(student => (
                        <StyledTableRow key={student.id}>
                            <StyledTableCell component="th" scope="row">
                                {student.id}
                            </StyledTableCell>
                            <StyledTableCell>{student.firstname}</StyledTableCell>
                            <StyledTableCell>{student.lastname}</StyledTableCell>
                            <StyledTableCell>{formatDatetime(student.created)}</StyledTableCell>
                            <StyledTableCell>{formatDatetime(student.lastupdated)}</StyledTableCell>
                            <StyledTableCell align='center'>
                                <NavLink
                                    to={'/student-profile/' + student.id}
                                    className='action-icon view'
                                    onClick={() => document.getElementById('/student-profile').classList.add('active')}
                                >
                                    <ViewIcon />
                                </NavLink>
                                <NavLink
                                    to={'/student-profile/' + student.id + '?action=edit'}
                                    className='action-icon edit'
                                    onClick={() => document.getElementById('/student-profile').classList.add('active')}
                                >
                                    <EditIcon />
                                </NavLink>
                                <span className='action-icon delete' onClick={() => onDeleteHandler(student.id)}>
                                    <DeleteIcon />
                                </span>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StudentsList;