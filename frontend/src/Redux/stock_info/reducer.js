import {Change_Page,Info_Query,Info_Query_Success,Info_Query_Failure} from "./actiontypes.js"

const initialState = {
    page:1,
    info:[]
}

export default (state = initialState, { type, payload }) => {
    
    switch (type) {

        case Change_Page:
            return {
                ...state,
                page:payload
            }
        
        case Info_Query:
            return {
                ...state
            }    
        
        case Info_Query_Success:
            return {
                ...state,
                info:payload
            }    
        
        case Info_Query_Failure:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
        }
}
