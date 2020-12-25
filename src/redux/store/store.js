import {applyMiddleware,createStore,compose} from "redux"
// import thunk from "redux-thunk"
import {Reducers} from "../reducers"
import {MiddleWare} from "../middleware"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store =createStore(
    Reducers,composeEnhancers(applyMiddleware(...MiddleWare))
)



