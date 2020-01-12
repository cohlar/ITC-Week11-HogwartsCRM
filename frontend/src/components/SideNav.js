import React from 'react';
import NavItem from './NavItem.js';

const navList = [
    { 'name': 'Dashboard',      'imgName': 'dashboard.png',     'path': '/'             },
    { 'name': 'Students',       'imgName': 'student-list.png',  'path': '/students'     },
    { 'name': 'View Student',   'imgName': 'view-student.png',  'path': '/view-student' },
    { 'name': 'Add Student',    'imgName': 'add-student.png',   'path': '/add-student'  }
]

function SideNav() {
    return (
        <nav>
            {navList.map((navElement) => {
                return (
                    <NavItem
                        name={navElement.name}
                        imgName={navElement.imgName}
                        path={navElement.path}
                        key={navElement.imgName}
                    />
                );
            })}
        </nav>
    );
}

export default SideNav;
