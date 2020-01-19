import React, { useState, useEffect } from 'react';
import StudentsList from '../components/StudentsList.js';
import { getStudents, deleteStudent } from '../lib/api.js';
import { parseErrorMessage } from '../lib/utils.js';

function Students() {
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [formMessage, setFormMessage] = useState({ 'status': null, 'message': null });

    function setTempMessage(type, message) {
        setFormMessage({
            'status': type,
            'message': message
        });

        setTimeout(() => {
            setFormMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    async function fetchStudents() {
        setIsLoading(true);
        try {
            const response = await getStudents();
            setStudents(response.data);
        }
        catch (error) {
            if (error.response && error.response.data) {
                setFormMessage({
                    'status': 'error',
                    'message': parseErrorMessage(error.response.data)
                });
            } else {
                setFormMessage({
                    'status': 'error',
                    'message': 'Server is down, please try again later.'
                });
            }
        }
        setIsLoading(false);
    }

    async function onDeleteHandler(id) {
        try {
            await deleteStudent(id);
            fetchStudents();
            setTempMessage('success', 'Student has been successfully deleted from the database.');
        }
        catch (error) {
            setTempMessage('error', parseErrorMessage(error.response.data));
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [])

    return (
        <main>
            {isLoading &&
                <div className='loader'></div>
            }
            {!isLoading && students.length > 0 &&
                <StudentsList
                    students={students}
                    onDeleteHandler={onDeleteHandler}
                />
            }
            {formMessage &&
                <>
                    <br />
                    <div className={formMessage.status}>
                        {formMessage.message}
                    </div>
                </>
            }
        </main>
    );
}

export default Students;
