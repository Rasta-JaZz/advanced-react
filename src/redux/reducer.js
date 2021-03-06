import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { reducer as form } from "redux-form"
import auth from "../ducks/auth"
import users from "../ducks/people"
import events from "../ducks/events"

const reducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		form,
		auth,
		users,
		events,
	})
export default reducer
