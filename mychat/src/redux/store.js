// import { createStore, compose } from "redux";

// import rootReducer from "./reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// let store = createStore(rootReducer, composeEnhancers());

// export default store;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
