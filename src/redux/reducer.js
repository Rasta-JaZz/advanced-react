import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { reducer as form } from "redux-form"
import authReducer from "../ducks/auth"

const reducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		form,
		authReducer,
	})
export default reducer
