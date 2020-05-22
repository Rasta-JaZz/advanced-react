import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { reducer as form } from "redux-form"

const reducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		form,
	})
export default reducer
