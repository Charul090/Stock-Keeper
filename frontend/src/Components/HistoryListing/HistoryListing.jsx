import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Form } from 'react-bootstrap'
import { History_Fetch } from "../../Redux/history/action.js"
import HistoryTable from '../HistoryTable/HistoryTable.jsx'
import Page from "../Page/Page.jsx"

export default function HistoryListing() {

    let dispatch = useDispatch()

    const [per_page, setPerPage] = useState(10)

    const page = useSelector((state)=>state.history.page)
    const total_pages = useSelector(state => state.history.info.total_pages)

    const handleChange = (e) => {
        let val = e.target.value

        setPerPage(val)
    }

    useEffect(() => {
        dispatch(History_Fetch())
    }, [])


    useEffect(()=>{
        dispatch(History_Fetch(page,per_page))
    },[per_page])

    return (
        <main>
            <Container fluid="md">
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
                        <HistoryTable />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                        <Col xs={12} md={10} lg={6}>
                            <Page total_pages={total_pages} method={History_Fetch} page={page} per_page={per_page} />
                        </Col>
                    </Row>
            </Container>
        </main>
    )
}
