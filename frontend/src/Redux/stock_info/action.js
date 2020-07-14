import {Change_Page,Info_Query,Info_Query_Success,Info_Query_Failure} from "./actiontypes.js"
import axios from "axios"

const Send_Query=()=>{
    return {
        type:Info_Query
    }
}

const Query_Successfull=(data)=>{
    return {
        type:Info_Query_Success,
        payload:data
    }
}

const Query_Failed=()=>{
    return {
        type:Info_Query_Failure
    }
}

const Change_Current_Page=(page)=>{
    return {
        type:Change_Page,
        payload:page
    }
}

const Info_Fetch=(page,per_page)=>{
    return dispatch=>{
        dispatch(Send_Query())
        axios({
            method:"get",
            url:"http://stock-backend.charul.co/stock/listing",
            params:{
                page:page,
                per_page:per_page
            }
        })
        .then((res)=>res.data)
        .then((data)=>{
            dispatch(Query_Successfull(data))
            dispatch(Change_Current_Page(data.current_page))
        })
        .catch((err)=>{
            console.log(err)
            dispatch(Query_Failed())
        })
    }
}

export {Info_Fetch,Change_Current_Page}