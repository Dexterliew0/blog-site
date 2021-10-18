import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);

    async function getLoggedIn() {
        // const loggedInRes = await fetch("http://localhost:5000/user/loggedIn", { credentials: 'include' });
        const loggedInRes = await fetch("https://blog-site-project-backend.herokuapp.com/user/loggedIn", { credentials: 'include' });
        const resJson = await loggedInRes.json();
        console.log(resJson);
        setLoggedIn(resJson.loggedIn);
        setCurrentUser(resJson.userID.user)
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return <AuthContext.Provider value={{ loggedIn, getLoggedIn, currentUser }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
export { AuthContextProvider };