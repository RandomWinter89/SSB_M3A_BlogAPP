import { Modal, Form, Button } from "react-bootstrap";
import React, { useState } from "react";

import { savePost } from "../features/postsSlice";
import { useDispatch } from "react-redux";

const FormModal = ({ show, onHide }) => {
    const [postThumbnail, setPostThumbnail] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postHeader, setPostHeader] = useState("");
    const [postAuthor, setPostAuthor] = useState("");
    const dispatch = useDispatch();

    const isEmptryString = () => {
        if (!postContent.trim().length || !postHeader.trim().length) 
            return true;
        return false;
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (!isEmptryString()) {
            dispatch(savePost({postContent, postHeader, postThumbnail, postAuthor}));
            setPostContent("");
            setPostHeader("");
            setPostThumbnail("");
            setPostAuthor("");
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                Create Blog Post
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            New Title
                        </Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Insert title"
                            onChange={(e) => setPostHeader(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Author Name
                        </Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Insert Author"
                            onChange={(e) => setPostAuthor(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            New Thumbnail
                        </Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Insert thumbnail"
                            onChange={(e) => setPostThumbnail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Add Content
                        </Form.Label>
                        <Form.Control
                            type="textarea"
                            placeholder="Insert content"
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit">Post</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FormModal;
