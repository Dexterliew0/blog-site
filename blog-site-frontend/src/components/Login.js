import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import './Login.css';

import AuthContext from '../context/AuthContext';

function Login() {

    const history = useHistory();

    const { getLoggedIn } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function login(e) {
        e.preventDefault();

        try {

            const loginData = {
                username,
                password
            };

            // const response = await fetch("http://localhost:5000/user/login", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginData) });
            const response = await fetch("https://blog-site-project-backend.herokuapp.com/user/login", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginData) });

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

    return <div id="login">
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <form id="login-form" onSubmit={login}>
            <input type="text" placeholder="Enter username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
            <input type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
            <button type="submit">Login</button>
        </form>
    </div>
};

export default Login;