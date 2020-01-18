import React from 'react';
import { NavLink } from 'react-router-dom'; 

function NavItem(props) {
    const { name, imgName, path, disabled } = props;
    return (
        <NavLink
            exact to={path}
            className={ disabled ? 'disabled nav-element' : 'nav-element'}
            onClick={(e) => {
                disabled && e.preventDefault();
                document.getElementById('/student-profile').classList.remove('active');
            }}
            id={path}
        >
            <img
                className='nav-icon'
                src={require('../img/icons/' + imgName)}
                alt={name + ' icon'}
            />
            {name}
        </NavLink>
    );
}

export default NavItem;
