import React, { useState } from 'react';
import { createStudent } from '../lib/api.js';
import StudentForm from '../components/StudentForm.js'
import { StudentContext } from '../context/StudentContext.js'

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

    function setSuccessMessage() {
        setFormMessage({
            'status': 'success',
            'message': 'Student has been successfully added to the database.'
        });

        setTimeout(() => {
            setFormMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    function setErrorMessage() {
        setFormMessage({
            'status': 'error',
            'message': 'There has been an error, please try again later (please see console for additional information).'
        });

        setTimeout(() => {
            setFormMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    const onCreateHandler = async (e) => {
        e.preventDefault();
        try {
            await createStudent(firstname, lastname, magicSkills, courses);
            setSuccessMessage();
            resetState();
        }
        catch (error) {
            setErrorMessage();
            console.log(error.response);
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
