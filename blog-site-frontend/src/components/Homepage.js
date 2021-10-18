import React, { useState, useEffect } from 'react';
import BlogPreview from './BlogPreview';
import './Homepage.css';

function Homepage() {

    const [blogPosts, setBlogPosts] = useState();

    async function getPosts() {

        try {
            // const response = await fetch("http://localhost:5000/post");
            const response = await fetch("https://blog-site-project-backend.herokuapp.com/post");

            const resJson = await response.json();

            setBlogPosts(resJson.posts);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div id="homepage">
            <h1>All Blog Posts</h1>
            {blogPosts ? blogPosts.map((post) => <BlogPreview key={post._id} blogId={post._id} blogTitle={post.title} blogContent={post.text} blogDate={post.date} blogAuthor={post.author.username} />) : <p className="loading">Loading...</p>}
        </div>
    )
};

export default Homepage;