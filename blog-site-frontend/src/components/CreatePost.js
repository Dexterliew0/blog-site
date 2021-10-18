import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './CreatePost.css';

function CreatePost() {

    const history = useHistory();

    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");

    async function createBlogPost(e) {
        e.preventDefault();

        try {

            const blogPostData = {
                title: blogTitle,
                text: blogContent
            };

            // const response = await fetch("http://localhost:5000/post", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogPostData) });
            const response = await fetch("https://blog-site-project-backend.herokuapp.com/post", { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogPostData) });

            const resJson = await response.json();

            history.push(`/post/${resJson.savedPost._id}`)

        } catch (err) {
            console.error(err);
        }
    }

    function back(e) {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div id="create-post">
            <h1>Create Blog Post</h1>
            <form onSubmit={createBlogPost}>
                <input id="title-input" type="text" placeholder="Blog Post Title" onChange={(e) => { setBlogTitle(e.target.value) }} value={blogTitle} />
                <textarea id="text-input" type="text" placeholder="Blog Post Content" onChange={(e) => { setBlogContent(e.target.value) }} value={blogContent} />
                <div id="create-post-buttons">
                    <button id="back-button" onClick={back}>Back</button>
                    <button id="create-post-button" type="submit">Create Blog Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;