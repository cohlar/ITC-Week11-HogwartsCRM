import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById, getStudentSkill, getStudentCourse } from '../lib/api.js';

function StudentProfile(props) {
    const { id } = useParams(); 
    const [student, setStudent] = useState(null);
    const [magicSkills, setMagicSKills] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let response = await getStudentById(id);
                const myStudent = response.data;
                console.log(myStudent)
                setStudent(myStudent);
                for (const stutentSkillId of myStudent.magicskills) {
                    response = await getStudentSkill(stutentSkillId);
                    const myStudentSkill = response.data;
                    console.log('myStudentSkill:', myStudentSkill)
                    setMagicSKills([...magicSkills, myStudentSkill]);
                }
                for (const stutentCourseId of myStudent.courses) {
                    response = await getStudentCourse(stutentCourseId);
                    const myStudentCourse = response.data;
                    console.log('myStudentCourse:', myStudentCourse)
                    setCourses([...courses, myStudentCourse]);
                }
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
                        Existing Magic Skillz: {magicSkills.toString()}
                    </p>
                    <p>
                        Desired Magic Skillz:
                    </p>
                    <p>
                        Interested in Courses: {courses.toString()}
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
