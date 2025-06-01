import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser} from "../features/postsSlice";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

import { Button } from "react-bootstrap";

import FormModal from "../components/FormModal";
import BlogGrid from "../components/BlogGrid";

const ProfilePage = () => {
    const [authToken] = useLocalStorage("authToken", "");
    const posts = useSelector((store) => store.posts.posts);
    
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate])
    
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token)
            dispatch(fetchPostsByUser());
        
    }, [dispatch])

    return(
        < >
            <Button style={{padding: '1em'}} onClick={() => {setShow(true)}}>Create Post</Button>
            {posts.length > 0 && <BlogGrid blogs={posts} editMode={true}/>}
            <FormModal 
                show={show}
                onHide={() => setShow(false)}
            />   
        </>
    )
}

export default ProfilePage;