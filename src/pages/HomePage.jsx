import { fetchAllPosts } from "../features/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import BlogGrid from "../components/BlogGrid";

const HomePage = () => {
    const posts = useSelector((store) => store.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token)
            dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <>
            {/* FreshReview */}
            {posts.length > 0 && <BlogGrid blogs={posts} />}
        </>
    );
};

export default HomePage;
