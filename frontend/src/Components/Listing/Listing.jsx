import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Button, Table , Form } from 'react-bootstrap';
import { Info_Fetch } from "../../Redux/stock_info/action.js"
import { v1 as uuid } from "uuid"
import Page from "../Page/Page.jsx"

export default function Listing() {

    let dispatch = useDispatch()

    let { info, page } = useSelector((state) => state)

    const [per_page, setPerPage] = useState(10)
    let { data } = info

    useEffect(() => {

        dispatch(Info_Fetch())

    }, [])

    useEffect(()=>{
        dispatch(Info_Fetch(1,per_page))
    },[per_page])

    const handleEdit = (e) => {
        let page_id = e.target.parentNode.parentNode.id

        console.log(page_id)

    }

    const handleChange=(e)=>{
        let val=e.target.value

        setPerPage(val)
    }


    if (data !== undefined) {
        return (
            <main>
                <Container fluid="sm">
                    <Row className="mt-5">
                        <Col xs={12} sm={3} className="offset-xs-0 offset-sm-8">
                            <Form.Group>
                                <Form.Label>Per Page</Form.Label>
                                <Form.Control as="select" value={per_page} onChange={handleChange}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={10}>
                            <Table responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ITEM</th>
                                        <th>QUANTITY</th>
                                        <th>PRICE</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((elem) => {
                                            return (
                                                <tr id={elem.stock_id} key={uuid()}>
                                                    <td>{elem.stock_id}</td>
                                                    <td>{elem.item.toUpperCase()}</td>
                                                    <td>{`${elem.quantity} ${elem.unit}`}</td>
                                                    <td>₹{elem.price}</td>
                                                    <td><Button onClick={handleEdit} variant="success" size="sm">CHANGE</Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={10} lg={6}>
                            <Page page={page}/>
                        </Col>
                    </Row>
                </Container>
            </main>
        )
    }
    else {
        return (
            <main>

            </main>
        )
    }


}