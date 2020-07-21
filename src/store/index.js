import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer,petreducer } from "./Reducer";
import thunk from 'redux-thunk'
const CombineReducer = combineReducers({authReducer,petreducer})
const store = createStore(CombineReducer, applyMiddleware(thunk));
export default store;