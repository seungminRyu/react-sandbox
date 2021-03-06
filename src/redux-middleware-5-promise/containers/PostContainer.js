import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../modules/_posts";
import Post from "../components/Post";

function PostContainer({ postId }) {
    const { data, loading, error } = useSelector((state) => state.posts.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId));
    }, [dispatch, postId]);

    if (loading) return <div>λ‘λ©μ€...</div>;
    if (error)
        return (
            <button onClick={() => dispatch(getPost(postId))}>
                π ν΄λ¦­νμ¬ λ€μ λ‘λ©
            </button>
        );
    if (!data)
        return (
            <div>
                <p>μ­μ λμκ±°λ λΉ νμ΄μ§ μλλ€.</p>
                <Link to="/">β©οΈ λμκ°κΈ°</Link>
            </div>
        );
    return <Post post={data} />;
}

export default PostContainer;
