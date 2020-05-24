import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Button, Table, Form, Spinner } from 'react-bootstrap';
import { Info_Fetch } from "../../Redux/stock_info/action.js"
import { v1 as uuid } from "uuid"
import Page from "../Page/Page.jsx"
import { AiOutlineDelete } from "react-icons/ai"
import axios from 'axios';
import InfoCards from '../InfoCards/InfoCards.jsx';

export default function Listing() {

    let dispatch = useDispatch()

    let history = useHistory()

    let { info, page } = useSelector((state) => state)

    const [per_page, setPerPage] = useState(10)
    const [message, setMessage] = useState("")
    let { data ,zero_stock ,low_stock } = info

    useEffect(() => {

        dispatch(Info_Fetch())

    }, [])

    useEffect(() => {
        dispatch(Info_Fetch(1, per_page))
    }, [per_page])

    const handleAdd = (e) => {
        let page_id = e.target.parentNode.parentNode.id

        history.push(`/item/add/${page_id}`)

    }

    const handleDeduct = (e) => {
        let page_id = e.target.parentNode.parentNode.id

        history.push(`/item/reduce/${page_id}`)

    }

    const handleChange = (e) => {
        let val = e.target.value

        setPerPage(val)
    }

    const handleDelete = (e) => {
        let val;

        if (e.target.nodeName === "path") {
            val = e.target.parentNode.parentNode.parentNode.parentNode.id

        }

        if (e.target.nodeName === "BUTTON") {
            val = e.target.parentNode.parentNode.id
        }

        if (e.target.nodeName === "svg") {
            val = e.target.parentNode.parentNode.parentNode.id
        }

        axios({
            method: "post",
            url: "http://127.0.0.1:5000/stock/delete",
            data: {
                stock_id: val,
                time: new Date().toLocaleString()
            },
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        })
            .then((res) => res.data)
            .then((data) => {
                dispatch(Info_Fetch(page, per_page))
                setMessage(data.message)
                setTimeout(() => {
                    setMessage("")
                }, 3000)
            })
            .catch((err) => console.log(err))

    }


    if (data !== undefined) {
        return (
            <main>
                <Container fluid="sm">
                    <InfoCards low_stock={low_stock} zero_stock={zero_stock}/>
                    <Row className="mt-3">
                        <Col xs={12} md={2} sm={3} className="offset-xs-0 offset-sm-9 offset-md-10">
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
                        <Col xs={12}>
                            <p className="text-danger">{message === "" ? null : message}</p>
                            <Table className="text-center" responsive="sm" striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ITEM</th>
                                        <th>QUANTITY</th>
                                        <th>PRICE</th>
                                        <th colSpan="3">ACTIONS</th>
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
                                                    <td>
                                                        <Button onClick={handleAdd} variant="success" size="sm">
                                                            Add Stock
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button onClick={handleDeduct} variant="warning" size="sm">
                                                            Deduct Stock
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button onClick={handleDelete} variant="dark" size="sm">
                                                            <AiOutlineDelete />
                                                        </Button>
                                                    </td>
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
                            <Page page={page} per_page={per_page} />
                        </Col>
                    </Row>
                </Container>
            </main>
        )
    }
    else {
        return (
            <main>
                <div className="d-flex justify-content-center">
                    <Spinner animation="grow" variant="primary" />
                </div>
            </main>
        )
    }


}
