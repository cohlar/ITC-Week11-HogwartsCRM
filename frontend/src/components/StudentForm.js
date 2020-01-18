import React, { useState, useContext } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MagicSkillForm from './MagicSkillForm.js';
import CoursesMultiSelect from './CoursesMultiSelect.js';
import { StudentContext } from '../context/StudentContext.js'

function StudentForm(props) {
    const { action: parentAction, onCreateHandler = null, onEditHandler = null, onDeleteHandler = null, resetStudent = null } = props;
    const [action, setAction] = useState(parentAction);
    const [isLoading, setIsLoading] = useState(false);
    const parentContext = useContext(StudentContext);

    function isDisabled() {
        return action === 'view';
    }

    function onCancelHander() {
        resetStudent();
        setAction('view');
    }

    return (
        <form>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <TextField
                        id='firstname'
                        label='First Name'
                        value={parentContext.firstname}
                        onChange={(e) => parentContext.setFirstname(e.target.value)}
                        required={!isDisabled()}
                        disabled={isDisabled()}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        id='lastname'
                        label='Last Name'
                        value={parentContext.lastname}
                        onChange={(e) => parentContext.setLastname(e.target.value)}
                        required={!isDisabled()}
                        disabled={isDisabled()}
                    />
                </Grid>

                <Grid item xs={12}>
                    Magic Skills:
                </Grid>

                {parentContext.magicSkills.map((skill, index) =>
                    <MagicSkillForm
                        key={index + skill.skill}
                        skill={skill}
                        index={index}
                        disabled={isDisabled()}
                    />
                )}

                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={() => parentContext.setMagicSkills([...parentContext.magicSkills, {}])}
                        disabled={isDisabled()}
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
                        disabled={isDisabled()}
                    />
                </Grid>

                <Grid item xs={12} container justify='flex-end' spacing={0}>
                    {action === 'create' &&
                        <Button
                            variant='contained'
                            onClick={onCreateHandler}
                        >
                            Create
                        </Button>
                    }

                    {action === 'view' && !parentContext.isDeleted &&
                        <>
                            <Button
                                variant='contained'
                                onClick={() => setAction('edit')}
                            >
                                Edit
                                </Button>
                            <Button
                                variant='contained'
                                onClick={(e) => {
                                    setIsLoading(true);
                                    onDeleteHandler(e);
                                    setIsLoading(false);
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    }

                    {action === 'edit' &&
                        <>
                            <Button
                                variant='contained'
                                onClick={onCancelHander}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                onClick={(e) => {
                                    setIsLoading(true);
                                    onEditHandler(e);
                                    setAction('view');
                                    setIsLoading(false);
                                }}
                            >
                                Save
                            </Button>
                        </>
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
