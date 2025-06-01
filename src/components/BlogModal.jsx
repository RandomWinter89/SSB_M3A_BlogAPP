import { Modal, Form, Button } from "react-bootstrap";
import { deletePost, updatePost } from "../features/postsSlice";
import { useDispatch } from "react-redux";

import React, { useState, useEffect } from "react";

const BlogModal = (props) => {
    const [updateMode, setUpdateMode] = useState(false);
    const [postThumbnail, setPostThumbnail] = useState(props.thumbnail);
    const [postContent, setPostContent] = useState(`${props.content}`);
    const [postHeader, setPostHeader] = useState(`${props.header}`);
    const [postAuthor, setPostAuthor] = useState(`${props.author}`);
    const dispatch = useDispatch();

    useEffect(() => {
        setPostThumbnail(props.thumbnail);
        setPostContent(props.content);
        setPostHeader(props.header);
        setPostAuthor(props.author);
    }, [props.thumbnail, props.content, props.header]);

    const onUpdate = () => {
        setUpdateMode(!updateMode);
    };
    
    const onRemoval = () => {
        dispatch(deletePost(props.blogId));
        props.onHide();
    };

    const handleSave = (e) => {
        e.preventDefault();

        onUpdate();
        const blogID = props.blogId;
        dispatch(updatePost({blogID, postAuthor, postHeader, postThumbnail, postContent}));
        props.onHide();
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                {props.editMode == true && (
                    <Button
                        onClick={() => {
                            onRemoval();
                        }}
                    >
                        Remove
                    </Button>
                )}
                {props.editMode == true && (
                    <Button className="mx-3" onClick={onUpdate}>
                        {updateMode ? "Disable Update" : "Enable Update"}
                    </Button>
                )}
            </Modal.Header>
            <Modal.Body style={{ padding: "0" }}>
                {!updateMode 
                    ? (
                        <>
                            <h1 style={{
                                    width: "100%", objectFit: "cover", aspectRatio: "16/9",
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), 
                                        rgba(0, 0, 0, 0.5)), 
                                        url(${props.thumbnail})`,
                                    backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center",
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    color: "white", textAlign: "center", padding: "1rem",
                                }}
                            >
                                {props.header}
                            </h1>
                            <h4 style={{ paddingInline: "1rem" }}>{props.author}</h4>
                            <p style={{ paddingInline: "1rem" }}>{props.content}</p>
                        </>
                    ) : (
                        < >
                            <Form style={{padding: "1rem"}} onSubmit={handleSave}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Update Title
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type="text"
                                        value= {postHeader}
                                        placeholder="Insert title"
                                        onChange={(e) => setPostHeader(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Update Author
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type="text"
                                        value= {postAuthor}
                                        placeholder="Insert Author"
                                        onChange={(e) => setPostAuthor(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Update Thumbnail
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        type="text"
                                        value= {postThumbnail}
                                        placeholder="Insert thumbnail"
                                        onChange={(e) => setPostThumbnail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Update Content
                                    </Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        value= {postContent}
                                        placeholder="Insert content"
                                        onChange={(e) => setPostContent(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type="submit">Post</Button>
                            </Form>
                        </>
                    )
                }
            </Modal.Body>
        </Modal>
    );
};

export default BlogModal;
