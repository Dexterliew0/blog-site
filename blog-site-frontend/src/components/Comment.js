import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';
import AuthContext from '../context/AuthContext';

function Comment({ commentText, commentAuthor, commentDate, commentAuthorId, commentId }) {

    const { currentUser } = useContext(AuthContext);

    return (
        <div id="comment">
            <p id="comment-text">{commentText}</p>
            <div id="comment-author-buttons">
                <div id="author-date">
                    <p id="comment-author">By {commentAuthor}</p>
                    <p>{new Date(commentDate).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                {commentAuthorId === currentUser &&
                    <div id="comment-buttons">
                        <Link to={`/edit-comment/${commentId}`}><button>Edit</button></Link>
                        <Link to={`/delete-comment/${commentId}`}><button>Delete</button></Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Comment;