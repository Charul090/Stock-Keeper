import React from 'react'
import { Table ,Spinner} from 'react-bootstrap'
import { useSelector } from "react-redux"
import {v1 as uuid} from "uuid"

export default function HistoryTable() {

    let data = useSelector((state) => state.history.info.data)

    if (data !== undefined) {
        return (
            <Table className="text-center" striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Operation</th>
                        <th>Quantity</th>
                        <th>TimeStamp</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((elem) => {
                            return (
                                <tr key={uuid()}>
                                    <td>{elem.stock_id}</td>
                                    <td>{elem.item.toUpperCase()}</td>
                                    <td>{elem.operation}</td>
                                    <td>{elem.quantity}</td>
                                    <td>{elem.time}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
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


