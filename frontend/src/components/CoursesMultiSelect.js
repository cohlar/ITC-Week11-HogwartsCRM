import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Input, Chip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// Pass these from the server
const course_list = ['Alchemy basics', 'Alchemy advanced', 'Magic for day-to-day life',
    'Magic for medical professionals', 'Dating with magic']

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 600,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(course, courses, theme) {
    return {
        fontWeight:
            courses.indexOf(course) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


function CoursesMultiSelect(props) {
    const classes = useStyles();
    const theme = useTheme();

    const { courses, onChangeHandler } = props;

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id='courses-label'>Courses</InputLabel>
            <Select
                labelId='courses-label'
                multiple
                input={<Input id='select-multiple-chip' />}
                value={courses}
                onChange={onChangeHandler}
                renderValue={selected => (
                    <div className={classes.chips}>
                        {selected.map((value) =>
                            <Chip key={value} label={value} className={classes.chip} />
                        )}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {course_list.map((course) =>
                    <MenuItem
                        key={course}
                        value={course}
                        style={getStyles(course, courses, theme)}
                    >
                        {course}
                    </MenuItem>
                )}
            </Select>
        </FormControl >
    );
}

export default CoursesMultiSelect;
