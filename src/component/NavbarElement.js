import React from 'react';
import {NavLink} from "react-router-dom";

function NavbarElement({name, path}) {
    return (
        <NavLink to={path}  className={"navbar-element"}>{name}</NavLink>
    );
}

export default NavbarElement;