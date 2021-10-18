import React, { useState, useEffect } from 'react';
import BlogPreview from './BlogPreview';
import './UserPosts.css';

function UserPosts() {

    const [blogPosts, setBlogPosts] = useState();

    async function getUserPosts() {

        try {

            // const response = await fetch("http://localhost:5000/post/user", { credentials: 'include' });
            const response = await fetch("https://blog-site-project-backend.herokuapp.com/post/user", { credentials: 'include' });

            const resJson = await response.json();

            setBlogPosts(resJson.posts);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <div id="user-posts">
            <h1>My Posts</h1>
            {blogPosts && blogPosts.map((blogPost) => <BlogPreview key={blogPost._id} blogTitle={blogPost.title} blogContent={blogPost.text} blogDate={blogPost.date} blogId={blogPost._id} blogAuthor={blogPost.author.username} />)}
        </div>
    )
}

export default UserPosts;