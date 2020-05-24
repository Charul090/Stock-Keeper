import React,{useState} from 'react'
import {Container , Row , Col, Form, Button} from "react-bootstrap"

export default function AddItem() {

    const [name,setName]=useState("")
    const [quantity,setQuantity]=useState("")
    const [price,setPrice]= useState("")
    const [unit,setUnit] = useState("")

    return (
        <main>
            <Container fluid="sm">
                <Row className="my-5">
                    <Col xs={12} md={8} className="offset-md-2">
                        <Form>
                            <Form.Group>
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Item Name..."></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Intial Quantity</Form.Label>
                                <Form.Control value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" placeholder="1,2,3..."></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control value={price} onChange={(e)=>setPrice(e.target.value)} type="number"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Unit</Form.Label>
                                <Form.Control value={unit} onChange={(e)=>setUnit(e.target.value)} type="text" placeholder="packet,kg,litres..."></Form.Control>
                            </Form.Group>
                            <Button variant="danger" type="submit" block>SUBMIT</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}
