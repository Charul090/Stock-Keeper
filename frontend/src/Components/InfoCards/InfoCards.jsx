import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import styles from "./InfoCards.module.css"
import { FaHistory } from "react-icons/fa"
import { IoIosTrendingDown } from "react-icons/io"
import { FaCreativeCommonsZero } from "react-icons/fa"
import { TiDocumentAdd } from "react-icons/ti"
import { IconContext } from "react-icons"
import { Link } from "react-router-dom"

export default function InfoCards({ low_stock, zero_stock }) {


    return (
        <Row className="mt-5 mb-3 text-center">
            <Col xs={10} sm={6} md={3} className="offset-1 offset-sm-0 mb-3 mb-md-0">
                <Card className={styles.card}>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <IconContext.Provider value={{ className: styles.icon1 }}>
                                <div>
                                    <FaHistory />
                                </div>
                            </IconContext.Provider>

                        </div>
                        <h4 className={styles.heading}>
                            <Link to="/history">
                                Transaction History
                            </Link>
                        </h4>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={10} sm={6} md={3} className="offset-1 offset-sm-0 mb-3 mb-md-0">
                <Card className={styles.card}>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <IconContext.Provider value={{ className: styles.icon2 }}>
                                <div>
                                    <IoIosTrendingDown />
                                </div>
                            </IconContext.Provider>

                        </div>
                        <h4 className={styles.heading}>{low_stock} {low_stock > 1 ? "items" : "item"}</h4>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={10} sm={6} md={3} className="offset-1 offset-sm-0 mb-3 mb-md-0">
                <Card className={styles.card}>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <IconContext.Provider value={{ className: styles.icon3 }}>
                                <div>
                                    <FaCreativeCommonsZero />
                                </div>
                            </IconContext.Provider>

                        </div>
                        <h4 className={styles.heading}>{zero_stock} {zero_stock > 1 ? "items" : "item"}</h4>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={10} sm={6} md={3} className="offset-1 offset-sm-0 mb-3 mb-md-0">
                <Card className={styles.card}>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <IconContext.Provider value={{ className: styles.icon4 }}>
                                <div>
                                    <TiDocumentAdd />
                                </div>
                            </IconContext.Provider>

                        </div>
                        <h4 className={styles.heading}>
                            <Link to="/newitem">
                                Add New Item
                            </Link>
                        </h4>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
