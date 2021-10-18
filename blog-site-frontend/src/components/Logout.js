import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import './Logout.css';

function Logout({menuOff}) {

    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();

    async function logOut() {
        // await fetch("http://localhost:5000/user/logout", { credentials: 'include' });
        await fetch("https://blog-site-project-backend.herokuapp.com/user/logout", { credentials: 'include' });
        await getLoggedIn();
        history.push('/');
    }

    return (
        <button className="nav-link" id="logout" onClick={() => {logOut(); menuOff();}}>
            Log Out
        </button>
    )
};

export default Logout;