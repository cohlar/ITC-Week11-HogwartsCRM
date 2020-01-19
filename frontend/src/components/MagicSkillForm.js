import React, { useState, useEffect, useContext } from 'react';
import { Grid, FormControlLabel, InputLabel, Select, MenuItem, RadioGroup, Radio, Slider, Typography } from '@material-ui/core';
import { DeleteIcon } from './Icons.js';
import { getMagicSkills } from '../lib/api.js';
import { parseErrorMessage } from '../lib/utils.js';
import { StudentContext } from '../context/StudentContext.js';

function MagicSkillForm(props) {
    const { skill, index, disabled: isDisabled } = props;
    const parentContext = useContext(StudentContext);

    const [staticMagicSkills, setStaticMagicSkills] = useState([]);
    const [magicSkill, setMagicSkill] = useState(skill.skill);
    const [skillType, setSkillType] = useState(skill.skilltype);
    const [skillLevel, setSkillLevel] = useState(skill.level || 1);
    const [errorMessage, setErrorMessage] = useState(null);

    function deleteMagicSkill(index) {
        const skills = parentContext.magicSkills;
        skills.splice(index, 1);
        parentContext.setMagicSkills([...skills]);
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getMagicSkills();
                setStaticMagicSkills(response.data);
            }
            catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage(parseErrorMessage(error.response.data));
                } else {
                    setErrorMessage('Server is down, please try again later.');
                }
            }
        })();
    }, [])

    useEffect(() => {
        function setMagicSkillByIndex(index, new_skill) {
            const skills = parentContext.magicSkills;
            skills[index] = new_skill;
            parentContext.setMagicSkills(skills);
        }
        const new_skill = {
            'skill': magicSkill,
            'skilltype': skillType,
            'level': skillLevel,
        }
        setMagicSkillByIndex(index, new_skill);
    }, [index, parentContext, magicSkill, skillType, skillLevel]);

    return (
        <>
            <Grid item xs={1}>
                {!isDisabled &&
                    <span className='action-icon delete margin-top' onClick={() => deleteMagicSkill(index)}
                    >
                        <DeleteIcon />
                    </span>
                }
            </Grid>

            <Grid item xs={3}>
                <InputLabel id='magic-skill-label'>Magic skill</InputLabel>
                <Select
                    labelId='magic-skill-label'
                    value={magicSkill}
                    onChange={(e) => setMagicSkill(e.target.value)}
                    required={!isDisabled}
                    disabled={isDisabled}
                >
                    {staticMagicSkills.map((skill) =>
                        <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    )}
                </Select>
            </Grid>

            <Grid item xs={5}>
                <RadioGroup
                    aria-label='skill-type'
                    name='skill-type'
                    value={skillType}
                    onChange={(e) => setSkillType(e.target.value)}
                    row
                    required={!isDisabled}
                >
                    <FormControlLabel value='existing' control={<Radio />} label='Existing' disabled={isDisabled} />
                    <FormControlLabel value='desired' control={<Radio />} label='Desired' disabled={isDisabled} />
                </RadioGroup>
            </Grid>

            <Grid item xs={3}>
                <Typography id="magic-skill-level-label" gutterBottom>
                    Skill Level
                </Typography>
                <Slider
                    value={skillLevel}
                    onChange={(e, val) => setSkillLevel(val)}
                    valueLabelDisplay={isDisabled ? 'on' : 'auto'}
                    aria-labelledby='magic-skill-level-label'
                    min={1}
                    max={5}
                    step={1}
                    marks={true}
                    required={!isDisabled}
                    disabled={isDisabled}
                />
            </Grid>
            {errorMessage &&
                <div className='error'>
                    {errorMessage}
                </div>
            }
        </>
    );
}

export default MagicSkillForm;
