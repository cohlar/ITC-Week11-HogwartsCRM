import React from 'react';
import NavItem from './NavItem.js';

const navList = [
    { 'name': 'Dashboard',          'imgName': 'dashboard.png',         'path': '/',                'disabled': false },
    { 'name': 'Students',           'imgName': 'student-list.png',      'path': '/students',        'disabled': false },
    { 'name': 'Student Profile',    'imgName': 'student-profile.png',   'path': '/student-profile', 'disabled': true },
    { 'name': 'Create Student',     'imgName': 'create-student.png',    'path': '/create-student',  'disabled': false }
]

function SideNav() {
    return (
        <nav>
            {navList.map((navElement) => {
                return (
                    <NavItem
                        key={navElement.imgName}
                        name={navElement.name}
                        imgName={navElement.imgName}
                        path={navElement.path}
                        disabled={navElement.disabled}
                    />
                );
            })}
        </nav>
    );
}

export default SideNav;
