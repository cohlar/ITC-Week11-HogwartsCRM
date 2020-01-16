import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudent, editStudent, deleteStudent } from '../lib/api.js';
import StudentForm from '../components/StudentForm.js'
import { StudentContext } from '../context/StudentContext.js'

function StudentProfile(props) {
    const { id } = useParams();
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
        setCourses(student.courses.map( (course) => course.course ));
    }

    const onEditHandler = async (e) => {
        e.preventDefault();
        try {
            editStudent(id, firstname, lastname, magicSkills, courses);
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
            deleteStudent(id);
            // setSuccessMessage();
            // resetState();
        }
        catch (error) {
            // setErrorMessage();
            console.log(error.response);
        }
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                let response = await getStudent(id);
                const myStudent = response.data;
                console.log(myStudent)
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
                        action='view'
                        onEditHandler={onEditHandler}
                        onDeleteHandler={onDeleteHandler}
                    />
                </StudentContext.Provider>
            }
        </main>
    );
}

export default StudentProfile;
