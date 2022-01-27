import React from "react";
import { Link } from "react-router-dom";

function PostList({ posts }) {
    return (
        <>
            <h2>Post List</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default PostList;
