import React from 'react'
import { Container, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"

export default function Page({ page, per_page,method,total_pages }) {

    let dispatch = useDispatch()

    let start = page - 1
    let end = page + 4

    let page_elements = []

    const handleClick=(e)=>{
        let val=e.target.firstChild.textContent

        if(val === "\u203A" && page < total_pages){
            dispatch(method(page+1,per_page))
        }
        else if(val === "\u2039" && page > 1){
            dispatch(method(page-1,per_page))
        }
        else{
            if(Number(val) !== page){
                dispatch(method(Number(val),per_page))
            }
        }
    }

    for (let i = start; i <= end; i++) {
        if (i === start) {
            page_elements.push(<Pagination.Prev disabled={page === 1} onClick={handleClick} key={`${i}-x`}></Pagination.Prev>)
            continue
        }

        if (i === end) {
            page_elements.push(
                <Pagination.Next key={`${i}-x`} disabled={ page === total_pages} onClick={handleClick}></Pagination.Next>
            )
            continue
        }

        if (i > 0 && i <= total_pages) {
            page_elements.push(
                <Pagination.Item key={`${i}-x`} active={page === i} onClick={handleClick}>{i}</Pagination.Item>
            )
        }
    }

    return (
        <Container className="d-flex justify-content-center" fluid>
            <Pagination>
                {total_pages > 1?page_elements:null}
            </Pagination>
        </Container >
    )
}
