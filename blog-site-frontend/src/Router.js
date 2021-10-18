import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import Homepage from './components/Homepage';
import UserPosts from './components/UserPosts';
import EditPost from './components/EditPost';
import DeletePost from './components/DeletePost';
import EditComment from './components/EditComment';
import DeleteComment from './components/DeleteComment';

import AuthContext from './context/AuthContext';



function Router() {

    const { loggedIn } = useContext(AuthContext);

    return <BrowserRouter>

        <Navbar />

        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>

            <Route path="/post/:postId">
                <PostDetail />
            </Route>

            {loggedIn === false && (
                <>
                    <Route path="/sign-up">
                        <Signup />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </>
            )}

            {loggedIn === true && (
                <>
                    <Route path="/user-posts">
                        <UserPosts />
                    </Route>
                    <Route path="/create-post">
                        <CreatePost />
                    </Route>
                    <Route path="/edit-post/:postId">
                        <EditPost />
                    </Route>
                    <Route path="/delete-post/:postId">
                        <DeletePost />
                    </Route>
                    <Route path="/edit-comment/:commentId">
                        <EditComment />
                    </Route>
                    <Route path="/delete-comment/:commentId">
                        <DeleteComment />
                    </Route>
                </>
            )}
            
        </Switch>
    </BrowserRouter>
}

export default Router;