import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { reducer as form } from "redux-form"
import authReducer from "../ducks/auth"
import userReducer from "../ducks/people"

const reducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		form,
		authReducer,
		userReducer,
	})
export default reducer
