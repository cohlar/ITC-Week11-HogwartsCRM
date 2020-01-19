import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StudentForm from '../components/StudentForm.js';
import { StudentContext } from '../context/StudentContext.js';
import { getStudent, editStudent, deleteStudent } from '../lib/api.js';
import { getParameterByName, parseErrorMessage } from '../lib/utils.js';

function StudentProfile() {
    const { id } = useParams();
    const location = useLocation();
    const action = (getParameterByName('action', location.search)) ? getParameterByName('action', location.search) : 'view';

    const [isLoading, setIsLoading] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [magicSkills, setMagicSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [formMessage, setFormMessage] = useState({ 'status': null, 'message': null });

    const stateContext = {
        firstname, setFirstname,
        lastname, setLastname,
        magicSkills, setMagicSkills,
        courses, setCourses,
        isDeleted, setIsDeleted,
        formMessage, setFormMessage,
    }

    function setStudent(student) {
        setFirstname(student.firstname);
        setLastname(student.lastname);
        setMagicSkills(student.magicskills);
        setCourses(student.courses.map((course) => course.course));
    }

    function setTempMessage(status, message) {
        setFormMessage({
            'status': status,
            'message': message
        });

        setTimeout(() => {
            setFormMessage({ 'status': null, 'message': null })
        }, 5000);
    }


    const onEditHandler = async (e) => {
        e.preventDefault();
        try {
            await editStudent(id, firstname, lastname, magicSkills, courses);
            setTempMessage('success', 'Student has been successfully updated in the database.');
        }
        catch (error) {
            if (error.response && error.response.data) {
                setTempMessage('error', parseErrorMessage(error.response.data));
            } else {
                setFormMessage({
                    'status': 'error',
                    'message': 'Server is down, please try again later.'
                });
            }
        }
    }

    const onDeleteHandler = async (e) => {
        e.preventDefault();
        try {
            await deleteStudent(id);
            setIsDeleted(true);
            setTempMessage('success', 'Student has been successfully deleted from the database.');
        }
        catch (error) {
            if (error.response && error.response.data) {
                setTempMessage('error', parseErrorMessage(error.response.data));
            } else {
                setFormMessage({
                    'status': 'error',
                    'message': 'Server is down, please try again later.'
                });
            }
        }
    }

    const resetStudent = async () => {
        try {
            let response = await getStudent(id);
            const myStudent = response.data;
            setStudent(myStudent);
        }
        catch (error) {
            if (error.response && error.response.data) {
                setTempMessage('error', parseErrorMessage(error.response.data));
            } else {
                setFormMessage({
                    'status': 'error',
                    'message': 'Server is down, please try again later.'
                });
            }
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                let response = await getStudent(id);
                const myStudent = response.data;
                setStudent(myStudent);
            }
            catch (error) {
                setFormMessage({
                    'status': 'error',
                    'message': 'Student profile could not be loaded'
                });
            }
            setIsLoading(false);
        })();
    }, [id])

    return (
        <main>
            {isLoading &&
                <div className='loader'></div>
            }
            {!isLoading &&
                <StudentContext.Provider value={stateContext}>
                    <StudentForm
                        action={action}
                        onEditHandler={onEditHandler}
                        onDeleteHandler={onDeleteHandler}
                        resetStudent={resetStudent}
                    />
                </StudentContext.Provider>
            }
        </main>
    );
}

export default StudentProfile;
