import { createStore, applyMiddleware } from "redux"
import { runMigration } from "../mocks/index"
import reducer from "./reducer"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { routerMiddleware } from "react-router-redux"
import createSagaMiddleware from "redux-saga"
import history from "../history"
import rootSaga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
	sagaMiddleware,
	routerMiddleware(history),
	logger,
	thunk
)

const store = createStore(reducer(history), enhancer)
window.store = store

sagaMiddleware.run(rootSaga)

export default store
