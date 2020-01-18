import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../lib/api.js';
import StudentsList from '../components/StudentsList.js'

function Students() {
    const [students, setStudents] = useState([]);

    async function fetchStudents() {
        try {
            const response = await getStudents(1);
            setStudents(response.data);
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.toString());
        }
    }

    async function onDeleteHandler(id) {
        try {
            await deleteStudent(id);
            fetchStudents();
            // setSuccessMessage();
            // resetState();
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <main>
            {students.length === 0 &&
                <>
                    Loading...
                </>
            }
            {students.length > 0 &&
                <StudentsList
                    students={students}
                    onDeleteHandler={onDeleteHandler}
                />
            }
        </main>
    );
}

export default Students;
