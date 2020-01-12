import React from 'react';
import { NavLink } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

function StudentsList(props) {
    const { students } = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="student-list">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map(student => (
                        <TableRow key={student.id}>
                            <TableCell component="th" scope="row">
                                {student.id}
                            </TableCell>
                            <TableCell>{student.firstname}</TableCell>
                            <TableCell>{student.lastname}</TableCell>
                            <TableCell>
                                <NavLink to={'/view-student/' + student.id}>
                                    View Details
                                </NavLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default StudentsList;
