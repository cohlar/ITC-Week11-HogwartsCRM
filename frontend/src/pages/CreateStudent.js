import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { createStudent } from '../lib/api.js';
import MagicSkillForm from '../components/MagicSkillForm.js';
import CoursesMultiSelect from '../components/CoursesMultiSelect.js';
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

    // function setMagicSkillByIndex(index, new_skill) {
    //     const skills = magicSkills;
    //     skills[index] = new_skill;
    //     setMagicSkills(skills);
    // }

    const onCreateHandler = async (e) => {
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
            <StudentContext.Provider value={stateContext}>

                <StudentForm
                    disabled={false}
                    onSubmitHandler={onCreateHandler}
                />
            </StudentContext.Provider>

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
                        <Button variant='contained' onClick={onCreateHandler} type='submit'>
                            Create
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        {formMessage.status &&
                            <div className={formMessage.status}>
                                {formMessage.message}
                            </div>
                        }
                    </Grid>

                </Grid>
            </form> */}
        </main >
    );
}

export default CreateStudent;
