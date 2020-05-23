import React, { useState, useEffect } from 'react'
import { Container, Jumbotron, Spinner, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import styles from "./AddStock.module.css"

export default function Item() {

    let { id } = useParams()

    let history = useHistory()

    const [data, setData] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [update, setUpdate] = useState(true)

    const [reqstatus, setReqStatus] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (update) {
            axios({
                method: "get",
                url: `http://127.0.0.1:5000/stock/add/${id}`
            })
                .then((res) => res.data)
                .then((data) => setData(data.data))
                .catch((err) => console.log(err))
        }
    }, [update])

    const handleAdd = (e) => {
        setQuantity(quantity + 1)
    }

    const handleReduce = (e) => {
        if (quantity >= 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleSubmit = () => {
        let date = new Date()

        setUpdate(false)

        let time = date.toLocaleString()

        let info = {
            add: quantity,
            time
        }

        info = JSON.stringify(info)

        axios({
            method: "post",
            url: `http://127.0.0.1:5000/stock/add/${id}`,
            data: info,
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        })
            .then((res) => res.data)
            .then((data) => {
                setMessage(data.message)
                setReqStatus(true)
                setQuantity(0)
                setUpdate(true)
                setTimeout(()=>{
                    setMessage("")
                    setReqStatus(false)
                },6000)
            })
            .catch((err) => console.log(err))

    }

    const handleBack = () => {
        history.goBack()
    }

    if (data !== "") {
        return (
            <Container fluid="sm">
                <Jumbotron className="mt-5 p-3 p-md-5" fluid>
                    <p className="text-danger">{reqstatus && message !== "" ? message:null}</p>
                    <Row>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Card>
                                <Card.Body className="text-center">
                                    <h4 className={styles.head1}>
                                        Item
                                    </h4>
                                    <h2 className={styles.head2}>
                                        {data.item.toUpperCase()}
                                    </h2>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Card>
                                <Card.Body className="text-center">
                                    <h4 className={styles.head1}>
                                        Current Quantity
                                    </h4>
                                    <h2 className={styles.head2}>
                                        {`${data.quantity.toUpperCase()} ${data.unit}`}
                                    </h2>
                                </Card.Body>
                            </Card></Col>
                        <Col md={4} className="mb-3 mb-md-0">
                            <Card>
                                <Card.Body className="text-center">
                                    <h4 className={styles.head1}>
                                        Price
                                    </h4>
                                    <h2 className={styles.head2}>
                                        ₹{data.price}
                                    </h2>
                                </Card.Body>
                            </Card></Col>
                    </Row>
                    <Row className="justify-content-center my-3">
                        <Col md={8}>
                            <Card>
                                <Card.Body className="text-center">
                                    <h2 className={styles.head2}>Amount to be added</h2>
                                    <Row className="justify-content-center">
                                        <Col md={8}>
                                            <Row className="justify-content-center">
                                                <Col xs={{ span: 5, order: 2 }} md={{ span: 4, order: 1 }} lg={3} className="mb-3 mb-md-0">
                                                    <Button block variant="success" onClick={handleAdd}>
                                                        <GrFormAdd />
                                                    </Button>
                                                </Col>
                                                <Col xs={{ span: 10, order: 1 }} md={{ span: 4, order: 2 }} lg={4}>
                                                    <Form.Group>
                                                        <Form.Control readOnly type="number" value={quantity}>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={{ span: 5, order: 2 }} md={{ span: 4, order: 3 }} lg={3}>
                                                    <Button disabled={quantity === 0} block variant="danger" onClick={handleReduce}>
                                                        <GrFormSubtract />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center my-3">
                                        <Col md={8}>
                                            <Button variant="primary" block onClick={handleSubmit}>Submit</Button>
                                            <Button variant="dark" block onClick={handleBack}>Go Back</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        )
    }
    else {
        return (
            <Container fluid="sm">
                <Spinner animation="grow" variant="sucess"></Spinner>
            </Container>
        )
    }
}
