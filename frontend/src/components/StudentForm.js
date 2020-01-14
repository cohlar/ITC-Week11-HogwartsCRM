import React, { useContext } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MagicSkillForm from './MagicSkillForm.js';
import CoursesMultiSelect from './CoursesMultiSelect.js';
import { StudentContext } from '../context/StudentContext.js'

function StudentForm(props) {
    const { disabled, onSumbitHandler } = props;
    const parentContext = useContext(StudentContext);

    function setMagicSkillByIndex(index, new_skill) {
        const skills = parentContext.magicSkills;
        skills[index] = new_skill;
        parentContext.setMagicSkills(skills);
    }

    return (
        <form>
            <Grid item xs={6}>
                <TextField
                    id='firstname'
                    label='First Name'
                    onChange={(e) => parentContext.setFirstname(e.target.value)}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    id='lastname'
                    label='Last Name'
                    onChange={(e) => parentContext.setLastname(e.target.value)}
                />
            </Grid>

            <Grid item xs={12}>
                Magic Skills:
            </Grid>

            {parentContext.magicSkills.map((skill, index) =>
                <MagicSkillForm
                    key={index}
                    setParentMagicSkill={setMagicSkillByIndex}
                    index={index}
                />
            )}

            <Grid item xs={12}>
                <Button
                    variant='contained'
                    onClick={() => parentContext.setMagicSkills([...parentContext.magicSkills, {}])}
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
                />
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant='contained'
                    onClick={onSumbitHandler}
                    type='submit'
                >
                    Create
                </Button>
            </Grid>
        </form>
    );
}

export default StudentForm;
