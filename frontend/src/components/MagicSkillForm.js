import React from 'react';
import { Grid, FormControlLabel, InputLabel, Select, MenuItem, RadioGroup, Radio, Slider, Typography } from '@material-ui/core';


function MagicSkillForm() {

    // Pass these from the server
    const magicskills = ['Alchemy', 'Animation', 'Conjuror', 'Disintegration', 'Elemental', 'Healing', 'Illusion', 'Immortality', 'Invisibility',
        'Invulnerability', 'Necromancer', 'Omnipresent', 'Omniscient', 'Poison', 'Possession', 'Self-detonation', 'Summoning', 'Water breathing']

    return (
        <>
            <Grid item xs={4}>
                <InputLabel id='magic-skill-label'>Magic skill</InputLabel>
                <Select
                    labelId='magic-skill-label'
                    onChange={(e) => console.log(e.target.value)}
                >
                    {magicskills.map((skill) =>
                        <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                    )}
                </Select>
            </Grid>

            <Grid item xs={4}>
                <RadioGroup aria-label='skill-type' name='skill-type' onChange={(e) => console.log(e.target.value)} row>
                    <FormControlLabel value='existing' control={<Radio />} label='Existing' />
                    <FormControlLabel value='desired' control={<Radio />} label='Desired' />
                </RadioGroup>
            </Grid>

            <Grid item xs={4}>
                <Typography id="magic-skill-level-label" gutterBottom>
                    Skill Level
                        </Typography>
                <Slider
                    onChange={(e, val) => console.log(val)}
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
