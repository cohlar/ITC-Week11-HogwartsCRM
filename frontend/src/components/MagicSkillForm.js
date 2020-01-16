import React, { useState, useEffect, useContext } from 'react';
import { Grid, FormControlLabel, InputLabel, Select, MenuItem, RadioGroup, Radio, Slider, Typography } from '@material-ui/core';
import { StudentContext } from '../context/StudentContext.js'

// Pass these from the server
const magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
    'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']

function MagicSkillForm(props) {
    const { skill, index, disabled: isDisabled } = props;
    const parentContext = useContext(StudentContext);

    const [magicSkill, setMagicSkill] = useState(skill.skill);
    const [skillType, setSkillType] = useState(skill.skilltype);
    const [skillLevel, setSkillLevel] = useState(skill.level);

    function setMagicSkillByIndex(index, new_skill) {
        const skills = parentContext.magicSkills;
        skills[index] = new_skill;
        parentContext.setMagicSkills(skills);
    }

    useEffect(() => {
        const new_skill = {
            'skill': magicSkill,
            'skilltype': skillType,
            'level': skillLevel,
        }
        setMagicSkillByIndex(index, new_skill);
    }, [index, magicSkill, skillType, skillLevel]);

    return (
        <>
            <Grid item xs={4}>
                <InputLabel id='magic-skill-label'>Magic skill</InputLabel>
                <Select
                    labelId='magic-skill-label'
                    value={magicSkill}
                    onChange={(e) => setMagicSkill(e.target.value)}
                    required={!isDisabled}
                    disabled={isDisabled}
                >
                    {magicskills.map((skill) =>
                        <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    )}
                </Select>
            </Grid>

            <Grid item xs={4}>
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

            <Grid item xs={4}>
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
        </>
    );
}

export default MagicSkillForm;
