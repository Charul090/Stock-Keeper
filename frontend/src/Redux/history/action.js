import {History_Query,History_Query_Successfull,History_Query_Failure,Change_Page} from "./actiontypes.js"
import axios from "axios"

const Send_History_Query=()=>{
    return {
        type:History_Query
    }
}

const History_Success=(data)=>{
    return {
        type:History_Query_Successfull,
        payload:data
    }
}

const History_Failure=()=>{
    return {
        type:History_Query_Failure
    }
}

const Change_Current_Page=(data)=>{
    return{
        type:Change_Page,
        payload:data
    }
}

const History_Fetch=(page,per_page)=>{
    return dispatch=>{
        dispatch(Send_History_Query())
        return axios({
            method:"get",
            url:"http://127.0.0.1:5000/stock/history",
            params:{
                page:page,
                per_page:per_page
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Change_Current_Page(data.current_page))
            dispatch(History_Success(data))
        })
        .catch((err)=>dispatch(History_Failure()))
    }
}


export {History_Fetch}