import {Change_Page,History_Query,History_Query_Successfull,History_Query_Failure} from "./actiontypes.js"

const initialState = {
    page:1,
    info:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    
    case Change_Page:
        return {
            ...state,
            page:payload
        }
    case History_Query:
        return {
            ...state
        }

    case History_Query_Successfull:
        return {
            ...state,
            info:payload
        }

    case History_Query_Failure:
        return {
            ...state
        }
    default:
        return {
            ...state
        }
    }
}
