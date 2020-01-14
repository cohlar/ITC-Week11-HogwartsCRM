import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { createStudent } from '../lib/api.js';
import StudentForm from '../components/StudentForm.js'
import { StudentContext } from '../context/StudentContext.js'

function CreateStudent() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [magicSkills, setMagicSkills] = useState([]);
    const [courses, setCourses] = useState([]);
    const [userMessage, setUserMessage] = useState({ 'status': null, 'message': null });

    const stateContext = {
        firstname, setFirstname,
        lastname, setLastname,
        magicSkills, setMagicSkills,
        courses, setCourses,
    }

    function setSuccessMessage() {
        setUserMessage({
            'status': 'success',
            'message': 'Student has been successfully added to the database.'
        });

        setTimeout(() => {
            setUserMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    function setErrorMessage() {
        setUserMessage({
            'status': 'error',
            'message': 'There has been an error, please try again later (please see console for additional information).'
        });

        setTimeout(() => {
            setUserMessage({ 'status': null, 'message': null })
        }, 5000);
    }

    async function onCreateHandler(e) {
        e.preventDefault();
        try {
            await createStudent(firstname, lastname, magicSkills, courses);
            setSuccessMessage();
            setFirstname('');
            setLastname('');
        }
        catch (error) {
            setErrorMessage();
            console.log(error.response);
        }
    }

    return (
        <main>
            <StudentContext value={stateContext}>
                <Grid container spacing={3}>

                    <StudentForm
                        disabled={false}
                        onSubmitHandler={onCreateHandler}
                    />

                    <Grid item xs={12}>
                        {userMessage.status &&
                            <div className={userMessage.status}>
                                {userMessage.message}
                            </div>
                        }
                    </Grid>

                </Grid>
                {/* <form>
                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                            <TextField id='firstname' label='First Name' onChange={(e) => setFirstname(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id='lastname' label='Last Name' onChange={(e) => setLastname(e.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            Magic Skills:
                    </Grid>

                        {magicSkills.map((skill, index) =>
                            <MagicSkillForm key={index} setParentMagicSkill={setMagicSkillByIndex} index={index} />
                        )}

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                onClick={() => setMagicSkills([...magicSkills, {}])}
                            >
                                Add Magic Skill
                        </Button>
                        </Grid>

                        <Grid item xs={12}>
                            Interested in Courses:
                    </Grid>

                        <Grid item xs={12}>
                            <CoursesMultiSelect
                                courses={courses}
                                onChangeHandler={(e) => setCourses(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant='contained' onClick={onSumbitHandler} type='submit'>
                                Create
                        </Button>
                        </Grid>

                        <Grid item xs={12}>
                            {userMessage.status &&
                                <div className={userMessage.status}>
                                    {userMessage.message}
                                </div>
                            }
                        </Grid>

                    </Grid>
                </form> */}
            </StudentContext>
        </main >
    );
}

export default CreateStudent;
