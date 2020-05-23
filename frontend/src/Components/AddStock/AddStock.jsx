import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"
import StockPage from '../StockPage/StockPage'

export default function AddStock() {

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
                },3000)
            })
            .catch((err) => console.log(err))

    }

    const handleBack = () => {
        history.goBack()
    }

    return (
        <StockPage operation="added" data={data} reqstatus={reqstatus} message={message}
            quantity={quantity} handleAdd={handleAdd} handleReduce={handleReduce}
            handleBack={handleBack} handleSubmit={handleSubmit}/>
    )
        
    
}
