import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById } from '../lib/api.js';
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

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                let response = await getStudentById(id);
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
                        onSubmitHandler={() => { }}
                    />
                </StudentContext.Provider>

                // <div />
                // <div>
                //     <p>
                //         ID: {student.id}
                //     </p>
                //     <p>
                //         First Name: {student.firstname}
                //     </p>
                //     <p>
                //         Last Name: {student.lastname}
                //     </p>
                //     <p>
                //         Existing Magic Skillz: {student.magicskills.toString()}
                //     </p>
                //     <p>
                //         Desired Magic Skillz:
                //     </p>
                //     <p>
                //         Interested in Courses: {student.courses.toString()}
                //     </p>
                //     <p>
                //         Created On: {student.created}
                //     </p>
                //     <p>
                //         Updated On: {student.lastupdated}
                //     </p>
                // </div>
            }
        </main>
    );
}

export default StudentProfile;
