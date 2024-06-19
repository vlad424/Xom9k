import React, { useContext } from "react";
import { Context } from "../index";
import Header from "./header/Header";
import Auth from "../pages/Auth";
import { Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";



const NavBar = observer( () => {
    const {user} = useContext(Context);
    return (
        
             <div>
                <Header/>
            </div>
            
    );
});

export default NavBar;
