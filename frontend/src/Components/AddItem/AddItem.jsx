import React, { useState } from 'react'
import {useHistory} from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import axios from "axios"

export default function AddItem() {

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [unit, setUnit] = useState("")

    let history = useHistory()

    const [submit, setSubmit] = useState(false)

    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name !== "" && quantity !== "" && price !== ""
            && unit !== "") {

            let obj = {
                name,
                unit,
                quantity,
                price
            }

            obj = JSON.stringify(obj)

            axios({
                method: "post",
                url: "http://127.0.0.1:5000/additem",
                data: obj,
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                }
            })
                .then((res) => res.data)
                .then((data) => {
                    setMessage(data.message)
                    setSubmit(true)
                    setName("")
                    setQuantity("")
                    setPrice("")
                    setUnit("")
                })
                .catch((err) => console.log(err))

        }
        else {
            setMessage("Please fill all the fields")
            setTimeout(() => {
                setMessage("")
            }, 3000)
        }
    }

    const handleAnother=()=>{
        setSubmit(false)
        setMessage("")
    }

    const handleBack=()=>{
        history.push("/")
    }

    if (!submit) {
        return (
            <main>
                <Container fluid="sm">
                    <Row className="my-5">
                        <Col xs={12} md={8} className="offset-md-2">
                            <p className="text-danger">{message === "" ? null : message}</p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Item Name..."></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Intial Quantity</Form.Label>
                                    <Form.Control value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="1,2,3..."></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="number"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control value={unit} onChange={(e) => setUnit(e.target.value)} type="text" placeholder="packet,kg,litres..."></Form.Control>
                                </Form.Group>
                                <Button variant="danger" type="submit" block>SUBMIT</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </main>
        )
    }
    else {
        return (
            <main>
                <Container fluid="sm">
                    <Row className="text-center my-5">
                        <Col xs={12} md={8} className="offset-md-2">
                            <h3>{message}!!!</h3>
                            <Button variant="primary" block onClick={handleAnother}>Add another Item</Button>
                            <Button variant="success" block onClick={handleBack}>Go Home</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        )
    }
}
