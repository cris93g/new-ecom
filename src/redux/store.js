import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";


const middleware = applyMiddleware(promiseMiddleware());


export default store;
