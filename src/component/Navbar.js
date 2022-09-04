import React, {useContext} from 'react';
import NavbarElement from "./NavbarElement";
import LogoutButton from "./LogoutButton";
import UserContext from "../context/UserContext";
import Routes from "../values/Routes";

function Navbar() {

    const {userData} = useContext(UserContext);

    const logo = require("../asset/bilgem-yte.png");

    return <div className={"navbar-main"}>
        <img className={"navbar-logo"} src={logo} alt={"YTE"}/>
        {Routes[userData.authorities[0]].map((item) => {
            return <NavbarElement key={item.id} name={item.name} path={item.path}/>;
        })}
        <LogoutButton/>
    </div>;
}

export default Navbar;