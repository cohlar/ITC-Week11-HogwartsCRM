import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getStudent, editStudent, deleteStudent } from '../lib/api.js';
import { getParameterByName } from '../lib/utils.js'
import StudentForm from '../components/StudentForm.js'
import { StudentContext } from '../context/StudentContext.js'

function StudentProfile() {
    const { id } = useParams();
    const location = useLocation();
    const action = ( getParameterByName('action', location.search) ) ? getParameterByName('action', location.search) : 'view';

    const [isLoading, setIsLoading] = useState(false);
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

    function setStudent(student) {
        setFirstname(student.firstname);
        setLastname(student.lastname);
        setMagicSkills(student.magicskills);
        setCourses(student.courses.map((course) => course.course));
    }

    const onEditHandler = async (e) => {
        e.preventDefault();
        try {
            await editStudent(id, firstname, lastname, magicSkills, courses);
            // setSuccessMessage();
            // resetState();
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.response);
        }
    }

    const onDeleteHandler = async (e) => {
        e.preventDefault();
        try {
            await deleteStudent(id);
            // setSuccessMessage();
            // resetState();
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.response);
        }
    }

    const resetStudent = async () => {
        try {
            let response = await getStudent(id);
            const myStudent = response.data;
            setStudent(myStudent);
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.toString());
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
                // setErrorMessage();
                console.log(error.toString());
            }
            setIsLoading(false);
        })();
    }, [id])

    return (
        <main>
            {isLoading &&
                <>
                    Loading...
                </>
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
