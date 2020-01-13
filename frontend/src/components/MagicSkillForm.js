import React, { useState } from 'react';
import { Grid, FormControlLabel, InputLabel, Select, MenuItem, RadioGroup, Radio, Slider, Typography } from '@material-ui/core';

// Pass these from the server
const magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
    'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']

function MagicSkillForm(props) {
    const { setParentMagicSkill, index } = props;

    const [magicSkill, setMagicSkill] = useState('');
    const [skillType, setSkillType] = useState('');
    const [skillLevel, setSkillLevel] = useState('');

    const handleChange = (value, callback) => {
        callback(value);
        const new_skill = {
            'skill': magicSkill,
            'skilltype': skillType,
            'level': skillLevel,
        }
        setParentMagicSkill(index, new_skill);
    };

    return (
        <>
            <Grid item xs={4}>
                <InputLabel id='magic-skill-label'>Magic skill</InputLabel>
                <Select
                    labelId='magic-skill-label'
                    onChange={(e) => handleChange(e.target.value, setMagicSkill)}
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
                    onChange={(e) => handleChange(e.target.value, setSkillType)}
                    row
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
                    onChange={(e, val) => handleChange(val, setSkillLevel)}
                    valueLabelDisplay='auto'
                    aria-labelledby='magic-skill-level-label'
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={1}
                    marks={true}
                />
            </Grid>
        </>
    );
}

export default MagicSkillForm;
