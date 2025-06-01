import { Row, Col } from 'react-bootstrap';
import React, { useState } from "react";
import BlogModal from "./BlogModal";
import BlogCard from "./BlogCard";

const BlogGrid = ({blogs, editMode}) => {
    const [show, setShow] = useState(false);
    const [blogId, setblogId] = useState(0);

    const handleOpen = (id) => {
        const index = blogs.findIndex((blog) => blog.id === id);
        setblogId(index);
        setShow(true);
    };

    return (
        < >
            <Row className="m-4">
                {blogs.map((blog) => (
                    <Col xs="auto" key={blog.id}>
                        <BlogCard 
                            id={blog.id}
                            handleOpen={handleOpen}
                            thumbnail={blog.thumbnail}
                            header={blog.title}
                            created={blog.created_at}
                            updated={blog.updated_at}
                        />
                    </Col>
                ))}
            </Row>
            <BlogModal
                show={show}
                editMode={editMode}
                onHide={() => setShow(false)}
                blogId={blogs[blogId]?.id}
                author={blogs[blogId]?.author}
                thumbnail={blogs[blogId]?.thumbnail}
                header={blogs[blogId]?.title}
                content={blogs[blogId]?.content}
            />
        </>
    )
}

export default BlogGrid;