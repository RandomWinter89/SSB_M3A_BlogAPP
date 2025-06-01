import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const VITE_API = import.meta.env.VITE_API;
    
//Read all posts
export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
        const res = await fetch(`${VITE_API}/posts`);
        const data = await res.json();
        return data;
    }
)

//Read User Post
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async () => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;
        
        const res = await fetch(`${VITE_API}/posts/${userId}`);
        const data = await res.json();
        return data;
    }
)

//Create Post
export const savePost = createAsyncThunk(
    "posts/savePost",
    async ({postContent, postHeader, postThumbnail, postAuthor}) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;
        
        const data = {
            author: postAuthor,
            title: postHeader,
            content: postContent,
            thumbnail: postThumbnail,
            userId: userId,
        };

        const response = await axios.post(`${VITE_API}/posts`, data, {
            headers: { authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }
)

//Update Post
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({blogID, postAuthor, postHeader, postThumbnail, postContent}) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;
        
        const data = {
            userId: userId,
            author: postAuthor,
            title: postHeader,
            content: postContent,
            thumbnail: postThumbnail,
        }

        const response = await axios.put(`${VITE_API}/posts/${blogID}`, data, {
            headers: { authorization: `Bearer ${token}` }
        });
        return response.data;
    }
)

//Delete Post
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const response = await axios.delete(`${VITE_API}/posts/${postId}`, {
            headers: { authorization: `Bearer ${token}` },
            data: { userId: userId }
        });
        return response.data;
    }
)

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {posts: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
        builder.addCase(savePost.fulfilled, (state, action) => {
            if (action.payload)
                state.posts = [...state.posts, action.payload];
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action.payload.updatedPost)
                state.posts = state.posts.map((post) => {
                    if (post.id === action.payload.updatedPost.id) {
                        return action.payload.updatedPost;
                    } else {
                        return post;
                    }
                })
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            if (action.payload.deletedPost)
                state.posts = state.posts.filter((post) => post.id !== action.payload.deletedPost?.id);
        })
    }
});

export default postsSlice.reducer;