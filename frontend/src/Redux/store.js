import {createStore,applyMiddleware,compose,combineReducers} from "redux"
import infoReducer from "./stock_info/reducer.js"
import historyReducer from "./history/reducer.js"
import thunk from "redux-thunk"


const reducers = combineReducers({items:infoReducer,history:historyReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

export {store}
