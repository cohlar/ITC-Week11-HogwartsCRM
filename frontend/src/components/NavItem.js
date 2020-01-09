import React from 'react';
import { NavLink } from 'react-router-dom';

function NavItem(props) {
    const { name, imgName, path } = props;
    return (
        <NavLink exact to={path} className='nav-element'>
            <img className='nav-icon' src={'/static/img/icons/' + imgName} alt='dashboard icon' />
            {name}
        </NavLink>
    );
}

export default NavItem;
