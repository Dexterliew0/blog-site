import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
import './CommentForm.css';

function CommentForm({ postId, getComments }) {

    const { loggedIn } = useContext(AuthContext);

    const [commentText, setCommentText] = useState("");

    const history = useHistory();

    async function createComment(e) {
        e.preventDefault();

        try {

            if (loggedIn === false) {
                return history.push('/login');
            }


            const comment = {
                text: commentText,
                post: postId
            }

            // await fetch("http://localhost:5000/comment", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(comment) });
            await fetch("https://blog-site-project-backend.herokuapp.com/comment", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(comment) });

            getComments();

            setCommentText("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
            <form id="comment-form" onSubmit={createComment}>
                <textarea type="text" placeholder="Leave a comment on this blog post . . . " onChange={(e) => setCommentText(e.target.value)} value={commentText} />
                <button type="submit">Submit</button>
            </form>
    )
}

export default CommentForm;