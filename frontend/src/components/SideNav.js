import React from 'react';
import NavItem from './NavItem.js';

const navList = [
    { 'name': 'Dashboard',      'imgName': 'dashboard.png',     'path': '/'             },
    { 'name': 'Students',       'imgName': 'student-list.png',  'path': '/students'     },
    { 'name': 'Student Card',   'imgName': 'student-card.png',  'path': '/student-card' },
    { 'name': 'Create Student', 'imgName': 'create-student.png','path': '/create-student'  }
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
