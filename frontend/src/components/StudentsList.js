import React from 'react';
import { NavLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function StudentsList(props) {
    const { students } = props;

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
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Created (UTC)</StyledTableCell>
                        <StyledTableCell>Last Updated (UTC)</StyledTableCell>
                        <StyledTableCell align='right'>Actions</StyledTableCell>
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
                            <StyledTableCell>{student.created}</StyledTableCell>
                            <StyledTableCell>{student.lastupdated}</StyledTableCell>
                            <StyledTableCell align='right'>
                                <NavLink to={'/student-profile/' + student.id} className='student-card-link'>
                                    View Details
                                </NavLink>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StudentsList;
