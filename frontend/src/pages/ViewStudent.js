import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentById } from '../lib/api.js';

function ViewStudent(props) {
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
    }, [])

    return (
        <main>
            {!student &&
                <>
                    Loading...
                </>
            }
            {student &&
                <p>
                    {student.id} {student.firstname} {student.lastname}
                </p>
            }
        </main>
    );
}

export default ViewStudent;
