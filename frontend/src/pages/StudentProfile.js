import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById } from '../lib/api.js';
import StudentForm from '../components/StudentForm.js'

function StudentProfile(props) {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        (async () => {
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
        })();
    }, [id])

    return (
        <main>
            {!student &&
                <>
                    Loading...
                </>
            }
            {student &&
                // <StudentContext.Provider value={stateContext}>

                //     <StudentForm
                //         disabled={false}
                //         onSubmitHandler={onCreateHandler}
                //     />
                // </StudentContext.Provider>
                <div>
                    <p>
                        ID: {student.id}
                    </p>
                    <p>
                        First Name: {student.firstname}
                    </p>
                    <p>
                        Last Name: {student.lastname}
                    </p>
                    <p>
                        Existing Magic Skillz: {student.magicskills.toString()}
                    </p>
                    <p>
                        Desired Magic Skillz:
                    </p>
                    <p>
                        Interested in Courses: {student.courses.toString()}
                    </p>
                    <p>
                        Created On: {student.created}
                    </p>
                    <p>
                        Updated On: {student.lastupdated}
                    </p>
                </div>
            }
        </main>
    );
}

export default StudentProfile;
