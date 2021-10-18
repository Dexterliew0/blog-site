import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import AuthContext from '../context/AuthContext';
import Logout from '../components/Logout';

function Navbar() {

    const { loggedIn } = useContext(AuthContext);

    const navLinks = document.querySelector("#nav-links");

    function toggleMenu() {
        navLinks.classList.toggle("menu-show");
    }

    function menuOff() {
        navLinks.classList.remove("menu-show");
    }

    return (<div id="navbar">

        <div id="title-menu">
        <Link id="title" onClick={menuOff} to="/"><h1>Blog Site</h1></Link>

        <i id="menu" onClick={toggleMenu} className="fas fa-bars"></i>
        </div>

        <div id="nav-links" className="nav-links">
            <Link className="nav-link" onClick={menuOff} to="/">Homepage</Link>
            {loggedIn === false && (
                <>
                    <Link className="nav-link" onClick={menuOff} to="/sign-up">Sign Up</Link>
                    <Link className="nav-link" onClick={menuOff} to="/login">Login</Link>
                </>
            )}

            {loggedIn === true && (
                <>
                    <Link className="nav-link" onClick={menuOff} to="/user-posts">My Posts</Link>
                    <Link className="nav-link" onClick={menuOff} to="/create-post">Create Blog Post</Link>
                    <Logout menuOff={menuOff} />
                </>
            )}
        </div>



    </div>
    )
};

export default Navbar;