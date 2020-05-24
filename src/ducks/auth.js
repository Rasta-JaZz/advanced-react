import firebase from "firebase/app"
import { appName } from "../config"
import { produce } from "immer"

const initialUserState = {
	user: null,
	error: null,
	loading: false,
}

export const moduleName = "auth"
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`

export default function reducer(state = initialUserState, action) {
	const { type, payload, error } = action

	return produce(state, (draft) => {
		switch (type) {
			case SIGN_UP_REQUEST:
				draft.loading = true
				return draft
			case SIGN_UP_SUCCESS:
				draft.user = payload.user
				draft.loading = false
				draft.error = null
				return draft
			case SIGN_UP_ERROR:
				draft.loading = false
				draft.error = error
				return draft
			default:
				return state
		}
	})
}

export function signUp(email, password) {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP_REQUEST,
		})

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) =>
				dispatch({
					type: SIGN_UP_SUCCESS,
					payload: { user },
				})
			)
			.catch((error) =>
				dispatch({
					type: SIGN_UP_ERROR,
					error,
				})
			)
	}
}
