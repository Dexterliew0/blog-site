import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import './EditComment.css';

function EditComment() {

    const history = useHistory();

    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    let { commentId } = useParams();

    async function getComment() {
        try {
            // const response = await fetch(`http://localhost:5000/comment/${commentId}`);
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/comment/${commentId}`);

            const resJson = await response.json();

            setComment(resJson.comment.text);

        } catch (err) {
            console.error(err);
        }
    }

    async function updateBlogPost(e) {
        e.preventDefault();

        try {

            const commentData = {
                text: comment
            };

            // const response = await fetch(`http://localhost:5000/comment/${commentId}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(commentData) });
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/comment/${commentId}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(commentData) });

            const resJson = await response.json();

            if (resJson.error) {
                return setError(resJson.error);
            }

            history.push(`/post/${resJson.updatedComment.post}`);

        } catch (err) {
            console.error(err);
        }
    }

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    useEffect(() => {
        getComment();
    }, []);

    return (
        <div id="edit-comment">
            <h1>Edit Comment</h1>
            {error && <p>{error}</p>}
            <form onSubmit={updateBlogPost}>
                <textarea id="text-input" type="text" placeholder="Edit Comment" onChange={(e) => { setComment(e.target.value) }} value={comment} />

                <div id="edit-comment-buttons">
                    <button id="back-button" onClick={back}>Back</button>
                    <button id="edit-comment-button" type="submit">Edit Comment</button>
                </div>
            </form>
        </div>
    )
}

export default EditComment;