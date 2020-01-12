import React, { useState, useEffect } from 'react';
import { getStudents } from '../lib/api.js';
import StudentsList from '../components/StudentsList.js'

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getStudents(1);
                setStudents(response.data);
            }
            catch (error) {
                // setErrorMessage();
                console.log(error.toString());
            }

        })();
    }, [])

    return (
        <main>
            {students.length === 0 &&
                <>
                    Loading...
                </>
            }
            {students.length > 0 &&
                <StudentsList students={students} />
            }
        </main>
    );
}

export default Students;
