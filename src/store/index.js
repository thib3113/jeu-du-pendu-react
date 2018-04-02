import {applyMiddleware, compose, createStore} from "redux";
import rootReducer                             from "../reducers/index";
import { createLogger }                        from "redux-logger";
import thunk                                   from "redux-thunk";

let middleware = [
    createLogger(),
    thunk
];

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;