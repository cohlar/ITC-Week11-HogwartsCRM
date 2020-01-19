import React, { useState } from 'react';
import StudentForm from '../components/StudentForm.js';
import { createStudent } from '../lib/api.js';
import { parseErrorMessage } from '../lib/utils.js';
import { StudentContext } from '../context/StudentContext.js';

function CreateStudent() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [magicSkills, setMagicSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [formMessage, setFormMessage] = useState({ 'status': null, 'message': null });

    const stateContext = {
        firstname, setFirstname,
        lastname, setLastname,
        magicSkills, setMagicSkills,
        courses, setCourses,
        formMessage, setFormMessage,
    }

    function resetState() {
        setFirstname('');
        setLastname('');
        setMagicSkills([]);
        setCourses([]);
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

    const onCreateHandler = async (e) => {
        e.preventDefault();
        try {
            await createStudent(firstname, lastname, magicSkills, courses);
            setTempMessage('success', 'Student has been successfully added to the database.');
            resetState();
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

    return (
        <main>
            <StudentContext.Provider value={stateContext}>
                <StudentForm
                    action='create'
                    onCreateHandler={onCreateHandler}
                />
            </StudentContext.Provider>
        </main >
    );
}

export default CreateStudent;
