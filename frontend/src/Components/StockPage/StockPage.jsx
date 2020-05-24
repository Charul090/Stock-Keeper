import React from 'react'
import { Container, Spinner, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import styles from "./StockPage.module.css"

export default function StockPage({operation,data,reqstatus,message,handleAdd,handleBack,handleReduce,handleSubmit,quantity}) {

    if (data !== "") {
        return (
            <Container fluid="sm">
                <div className="mt-5 p-3 p-md-5" fluid>
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
                                    <h2 className={styles.head2}>{`Amount to be ${operation}`}</h2>
                                    <Row className="justify-content-center">
                                        <Col md={8}>
                                            <Row className="justify-content-center">
                                                <Col xs={{ span: 5, order: 2 }} md={{ span: 4, order: 1 }} lg={3} className="mb-3 mb-md-0">
                                                    <Button disabled={operation === "reduced" && quantity === Number(data.quantity)}block variant="success" onClick={handleAdd}>
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
                </div>
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
