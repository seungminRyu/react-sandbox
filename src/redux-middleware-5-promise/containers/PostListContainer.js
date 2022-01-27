import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "../components/PostLists";
import { getPosts } from "../modules/_posts";

function PostListContainer() {
    const { data, loading, error } = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    if (loading) return <div>로딩 중...</div>;
    if (error)
        return (
            <button onClick={() => dispatch(getPosts())}>
                클릭하여 다시 로드
            </button>
        );
    if (!data) return null;
    return <PostList posts={data} />;
}

export default PostListContainer;
