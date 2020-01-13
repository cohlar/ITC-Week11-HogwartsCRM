import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById } from '../lib/api.js';

function StudentCard(props) {
    const { id } = useParams(); 
    const [student, setStudent] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await getStudentById(id);
                setStudent(response.data);
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
                        Existing Magic Skillz:
                    </p>
                    <p>
                        Desired Magic Skillz:
                    </p>
                    <p>
                        Interested in Courses:
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

export default StudentCard;
