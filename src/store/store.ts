import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'; 
// reducers
import { HomeLoanReducer } from "./home-loan-reducer/home-loan-reducers";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    homeLoan: HomeLoanReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose || compose;
/* const composeEnhancers = composeWithDevTools({}); */

const appStore = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

export { appStore };

export type AppDispatch = typeof appStore.dispatch