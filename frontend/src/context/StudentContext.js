
import { createContext } from 'react';

export const StudentContext = createContext({
    firstname: '',
    setFirstname: () => { },

    lastname: '',
    setLastname: () => { },

    magicSkills: [],
    setMagicSkills: () => { },

    courses: [],
    setCourses: () => { },
}); 