import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import './DeleteComment.css';

function DeleteComment() {

    const history = useHistory();

    const [error, setError] = useState("");

    let { commentId } = useParams();

    async function deleteComment(e) {
        e.preventDefault();

        try {

            // const response = await fetch(`http://localhost:5000/comment/${commentId}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } });
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/comment/${commentId}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' } });

            const resJson = await response.json();

            if (resJson.error) {
                return setError(resJson.error);
            }

            history.push(`/post/${resJson.deletedComment.post}`);

        } catch (err) {
            console.error(err);
        }
    }

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div id="delete-comment">
            <h1>Delete Comment</h1>
            {error && <p>{error}</p>}
            <p>Are you sure you wish to delete this comment?</p>
                <div id="delete-comment-buttons">
                    <button id="back-button" onClick={back}>Back</button>
                    <button id="delete-comment-button" onClick={deleteComment} type="submit">Delete</button>
                </div>
        </div>
    )
}

export default DeleteComment;