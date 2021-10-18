import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import './DeletePost.css';

function DeletePost() {

    const history = useHistory();

    const [error, setError] = useState("");

    let { postId } = useParams();

    async function deleteBlogPost(e) {
        e.preventDefault();

        try {

            // const response = await fetch(`http://localhost:5000/post/${postId}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } });
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/post/${postId}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } });

            const resJson = await response.json();

            if (resJson.error) {
                return setError(resJson.error);
            }

            history.push("/");

        } catch (err) {
            console.error(err);
        }
    }

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div id="delete-post">
            <h1>Delete Blog Post</h1>
            {error && <p>{error}</p>}
            <p>Are you sure you wish to delete this blog post?</p>
                <div id="delete-post-buttons">
                    <button id="back-button" onClick={back}>Back</button>
                    <button id="delete-post-button" onClick={deleteBlogPost} type="submit">Delete</button>
                </div>
        </div>
    )
}

export default DeletePost;