import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPreview.css';

function BlogPreview({ blogTitle, blogContent, blogDate, blogId, blogAuthor }) {
    return (
        <div id="blog-preview">
            <Link className="blog-link" to={`/post/${blogId}`}>
                <h2>{blogTitle}</h2>
                <p>{blogContent}</p>
            </Link>
            <div id="author-date">
            <p id="author">By {blogAuthor}</p>
            <p id="date">{new Date(blogDate).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
        </div>
    )
}

export default BlogPreview;