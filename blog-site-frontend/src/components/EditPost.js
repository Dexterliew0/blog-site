import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import './EditPost.css';

function EditPost() {

    const history = useHistory();

    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [error, setError] = useState("");

    let { postId } = useParams();

    async function getBlogPost() {
        try {
            // const response = await fetch(`http://localhost:5000/post/${postId}`);
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/post/${postId}`);

            const resJson = await response.json();

            setBlogTitle(resJson.post.title);
            setBlogContent(resJson.post.text);

        } catch (err) {
            console.error(err);
        }
    }

    async function updateBlogPost(e) {
        e.preventDefault();

        try {

            const blogPostData = {
                title: blogTitle,
                text: blogContent
            };

            // const response = await fetch(`http://localhost:5000/post/${postId}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogPostData) });
            const response = await fetch(`https://blog-site-project-backend.herokuapp.com/post/${postId}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogPostData) });

            const resJson = await response.json();

            if (resJson.error) {
                return setError(resJson.error);
            }

            history.push(`/post/${resJson.updatedPost._id}`);

        } catch (err) {
            console.error(err);
        }
    }

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    useEffect(() => {
        getBlogPost();
    }, []);

    return (
        <div id="edit-post">
            <h1>Edit Blog Post</h1>
            {error && <p>{error}</p>}
            <form onSubmit={updateBlogPost}>
                <input id="title-input" type="text" placeholder="Blog Post Title" onChange={(e) => { setBlogTitle(e.target.value) }} value={blogTitle} />
                <textarea id="text-input" type="text" placeholder="Blog Post Content" onChange={(e) => { setBlogContent(e.target.value) }} value={blogContent} />

                <div id="edit-post-buttons">
                    <button id="back-button" onClick={back}>Back</button>
                    <button id="edit-post-button" type="submit">Edit Post</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost;