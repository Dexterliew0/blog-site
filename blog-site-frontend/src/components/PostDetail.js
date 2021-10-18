import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import Comment from './Comment';
import AuthContext from '../context/AuthContext';
import './PostDetail.css';

function PostDetail() {

    const { currentUser } = useContext(AuthContext);

    const [blogPostTitle, setBlogPostTitle] = useState("");
    const [blogPostContent, setBlogPostContent] = useState("");
    const [blogPostAuthor, setBlogPostAuthor] = useState("");
    const [blogPostDate, setBlogPostDate] = useState("");
    const [blogPostAuthorId, setBlogPostAuthorId] = useState("");

    const [comments, setComments] = useState();

    let { postId } = useParams();

    async function getPost() {
        // const response = await fetch(`http://localhost:5000/post/${postId}`);
        const response = await fetch(`https://blog-site-project-backend.herokuapp.com/post/${postId}`);

        const resJson = await response.json();

        setBlogPostTitle(resJson.post.title);
        setBlogPostContent(resJson.post.text);
        setBlogPostAuthor(resJson.post.author.username);
        setBlogPostDate(resJson.post.date);
        setBlogPostAuthorId(resJson.post.author._id);
    };

    async function getComments() {
        // const response = await fetch(`http://localhost:5000/comments/${postId}`);
        const response = await fetch(`https://blog-site-project-backend.herokuapp.com/comments/${postId}`);

        const resJson = await response.json();

        setComments(resJson.comments);
    }

    useEffect(() => {
        getPost();
        getComments();
    }, []);

    return (
        <div id="post-detail">
            <div id="blog-post">
                <div id="title-content">
                    <h1>{blogPostTitle}</h1>
                    <p>{blogPostContent}</p>
                </div>
                <div id="date-buttons">
                    <div id="author-date">
                        <p id="author">By {blogPostAuthor}</p>
                        <p id="date">{new Date(blogPostDate).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    {blogPostAuthorId === currentUser &&
                        <div id="edit-delete-buttons">
                            <Link to={`/edit-post/${postId}`}><button>Edit</button></Link>
                            <Link to={`/delete-post/${postId}`}><button>Delete</button></Link>
                        </div>
                    }


                </div>
            </div>

            <div id="comments">
                <div id="comment-title-form">
                    <h2>Comments</h2>
                    {<CommentForm postId={postId} getComments={getComments} />}
                </div>
                {comments && comments.map((comment) => <Comment key={comment._id} commentId={comment._id} commentText={comment.text} commentAuthor={comment.author.username} commentDate={comment.date} commentAuthorId={comment.author._id} />)}
            </div>
        </div >
    )
}

export default PostDetail;