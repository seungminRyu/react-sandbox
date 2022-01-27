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

    if (loading) return <div>로딩중...</div>;
    if (error)
        return (
            <button onClick={() => dispatch(getPost(postId))}>
                🔃 클릭하여 다시 로딩
            </button>
        );
    if (!data)
        return (
            <div>
                <p>삭제되었거나 빈 페이지 입니다.</p>
                <Link to="/">↩️ 돌아가기</Link>
            </div>
        );
    return <Post post={data} />;
}

export default PostContainer;
