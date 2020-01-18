import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Input, Chip } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getCourses } from '../lib/api.js';
import { parseErrorMessage } from '../lib/utils.js';

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
    const { courses, onChangeHandler, disabled: isDisabled } = props;
    const [staticCourses, setStaticCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        (async () => {
            try {
                const response = await getCourses();
                setStaticCourses(response.data);
            }
            catch (error) {
                setErrorMessage(parseErrorMessage(error.response.data));
            }
        })();
    }, [])

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
                disabled={isDisabled}
            >
                {staticCourses.map((course) =>
                    <MenuItem
                        key={course}
                        value={course}
                        style={getStyles(course, courses, theme)}
                    >
                        {course}
                    </MenuItem>
                )}
            </Select>
            {errorMessage &&
                <div className='error'>
                    {errorMessage}
                </div>
            }
        </FormControl >
    );
}

export default CoursesMultiSelect;
