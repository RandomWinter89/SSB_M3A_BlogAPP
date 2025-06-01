import { Card } from "react-bootstrap";

const BlogCard = ({id, handleOpen, thumbnail, created, updated, header}) => {
    const extractTime = (givenDate) => {
        const date = new Date(givenDate);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    }
    
    return (
        <Card className="my-3" style={{width: '14rem', padding: '1em'}} onClick={() => handleOpen(id)}>
            <Card.Img className="mb-2" src={`${thumbnail}`}/>
            <Card.Body style={{padding: "0"}}>
                <Card.Title>{header}</Card.Title>
                <Card.Text 
                    style={{ 
                        fontSize: "0.8rem", 
                        marginBottom: "0.5em", 
                        backgroundColor: "rgba(0,0,0,0.45)", 
                        padding: "0.5em" 
                    }}
                >{extractTime(updated)}</Card.Text>
                <Card.Text 
                    style={{ 
                        fontSize: "0.8rem", 
                        marginBottom: "0.5em", 
                        backgroundColor: "rgba(255,0,0,0.5)", 
                        padding: "0.5em" 
                    }}
                >{extractTime(created)}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default BlogCard;