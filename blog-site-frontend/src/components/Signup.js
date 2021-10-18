import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import './Signup.css';

import AuthContext from '../context/AuthContext';

function Signup() {

    const history = useHistory();

    const { getLoggedIn } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [error, setError] = useState("");

    async function signup(e) {
        e.preventDefault();

        try {

            const signupData = {
                username,
                password,
                confirm
            };

            // const response = await fetch("http://localhost:5000/user/register", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(signupData) });
            const response = await fetch("https://blog-site-project-backend.herokuapp.com/user/register", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(signupData) });

            const resJson = await response.json();

            if (resJson.error) {
                setError(resJson.error);
            } else {

                await getLoggedIn();

                history.push('/');

            }

        } catch (err) {
            console.error(err);
        }
    }

    return <div id="signup">
        <h1>Sign Up</h1>
        {error && <p>{error}</p>}
        <form id="signup-form" onSubmit={signup}>
            <input type="text" placeholder="Enter a username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
            <input type="password" placeholder="Enter a password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <input type="password" placeholder="Confirm password" onChange={(e) => { setConfirm(e.target.value) }} value={confirm} />
            <button type="submit">Sign Up</button>
        </form>
    </div>
};

export default Signup;