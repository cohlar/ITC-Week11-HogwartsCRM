import React, { useContext } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MagicSkillForm from './MagicSkillForm.js';
import CoursesMultiSelect from './CoursesMultiSelect.js';
import { StudentContext } from '../context/StudentContext.js'

function StudentForm(props) {
    const { disabled, onSubmitHandler } = props;
    const parentContext = useContext(StudentContext);

    return (
        <form>
            <Grid container spacing={3}>

                <Grid item xs={6}>
                    <TextField
                        id='firstname'
                        label='First Name'
                        onChange={(e) => parentContext.setFirstname(e.target.value)}
                        required={!disabled}
                        disabled={disabled}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id='lastname'
                        label='Last Name'
                        onChange={(e) => parentContext.setLastname(e.target.value)}
                        required={!disabled}
                        disabled={disabled}
                    />
                </Grid>

                <Grid item xs={12}>
                    Magic Skills:
            </Grid>

                {parentContext.magicSkills.map((skill, index) =>
                    <MagicSkillForm
                        key={index}
                        index={index}
                        disabled={disabled}
                    />
                )}

                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={() => parentContext.setMagicSkills([...parentContext.magicSkills, {}])}
                        disabled={disabled}
                    >
                        Add Magic Skill
                        </Button>
                </Grid>

                <Grid item xs={12}>
                    Interested in Courses:
                    </Grid>

                <Grid item xs={12}>
                    <CoursesMultiSelect
                        courses={parentContext.courses}
                        onChangeHandler={(e) => parentContext.setCourses(e.target.value)}
                        disabled={disabled}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={onSubmitHandler}
                        disabled={disabled}
                    >
                        Create
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    {parentContext.formMessage.status &&
                        <div className={parentContext.formMessage.status}>
                            {parentContext.formMessage.message}
                        </div>
                    }
                </Grid>

            </Grid>
        </form>
    );
}

export default StudentForm;
