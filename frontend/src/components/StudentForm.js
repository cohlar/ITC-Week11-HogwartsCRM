import React, { useContext } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MagicSkillForm from './MagicSkillForm.js';
import CoursesMultiSelect from './CoursesMultiSelect.js';
import { StudentContext } from '../context/StudentContext.js'

function StudentForm(props) {
    const { action, onSubmitHandler } = props;
    const parentContext = useContext(StudentContext);

    function setIsDisabled(action) {
        return action === 'view' ? true : false;
    }

    const isDisabled = setIsDisabled(action);

    return (
        <form>
            <Grid container spacing={3}>

                <Grid item xs={6}>
                    <TextField
                        id='firstname'
                        label='First Name'
                        value={parentContext.firstname}
                        onChange={(e) => parentContext.setFirstname(e.target.value)}
                        required={!isDisabled}
                        disabled={isDisabled}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id='lastname'
                        label='Last Name'
                        value={parentContext.lastname}
                        onChange={(e) => parentContext.setLastname(e.target.value)}
                        required={!isDisabled}
                        disabled={isDisabled}
                    />
                </Grid>

                <Grid item xs={12}>
                    Magic Skills:
                </Grid>

                {parentContext.magicSkills.map((skill, index) =>
                    <MagicSkillForm
                        key={index}
                        skill={skill}
                        index={index}
                        disabled={isDisabled}
                    />
                )}

                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={() => parentContext.setMagicSkills([...parentContext.magicSkills, {}])}
                        disabled={isDisabled}
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
                        value={parentContext.courses}
                        onChangeHandler={(e) => parentContext.setCourses(e.target.value)}
                        disabled={isDisabled}
                    />
                </Grid>

                <Grid item xs={12}>
                    {action === 'create' &&
                        <Button
                            variant='contained'
                            onClick={onSubmitHandler}
                            disabled={isDisabled}
                        >
                            Create
                        </Button>
                    }
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
