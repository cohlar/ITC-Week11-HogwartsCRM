import React, { useState, useEffect, useContext } from 'react';
import { Grid, FormControlLabel, InputLabel, Select, MenuItem, RadioGroup, Radio, Slider, Typography } from '@material-ui/core';
import { StudentContext } from '../context/StudentContext.js'

// Pass these from the server
const magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
    'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']

function MagicSkillForm(props) {
    const { index, disabled } = props;
    const parentContext = useContext(StudentContext);

    const [magicSkill, setMagicSkill] = useState('');
    const [skillType, setSkillType] = useState('');
    const [skillLevel, setSkillLevel] = useState(1);

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
    }, [magicSkill, skillType, skillLevel]);

    return (
        <>
            <Grid item xs={4}>
                <InputLabel id='magic-skill-label'>Magic skill</InputLabel>
                <Select
                    labelId='magic-skill-label'
                    onChange={(e) => setMagicSkill(e.target.value)}
                    required
                    disabled={disabled}
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
                    onChange={(e) => setSkillType(e.target.value)}
                    row
                    required
                    disabled={disabled}
                >
                    <FormControlLabel value='existing' control={<Radio />} label='Existing' />
                    <FormControlLabel value='desired' control={<Radio />} label='Desired' />
                </RadioGroup>
            </Grid>

            <Grid item xs={4}>
                <Typography id="magic-skill-level-label" gutterBottom>
                    Skill Level
                </Typography>
                <Slider
                    onChange={(e, val) => setSkillLevel(val)}
                    valueLabelDisplay='auto'
                    aria-labelledby='magic-skill-level-label'
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={skillLevel}
                    marks={true}
                    required
                    disabled={disabled}
                />
            </Grid>
        </>
    );
}

export default MagicSkillForm;
