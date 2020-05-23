import firebase from "firebase"
import { appName } from "../config"
import { produce } from "immer"

const initialUserState = {
	user: null,
	error: null,
	loading: false,
}

export const moduleName = "auth"
export const SING_UP_REQUEST = `${appName}/${moduleName}/SING_UP_REQUEST`
export const SING_UP_SUCCESS = `${appName}/${moduleName}/SING_UP_SUCCESS`
export const SING_UP_ERROR = `${appName}/${moduleName}/SING_UP_ERROR`

export default function reducer(state = initialUserState, action) {
	const { type, payload, error } = action

	return produce(state, (draft) => {
		switch (type) {
			case SING_UP_REQUEST:
				draft.loading = true
				return draft
			case SING_UP_SUCCESS:
				draft.user = payload.user
				draft.loading = false
				draft.error = null
				return draft
			case SING_UP_ERROR:
				draft.loading = false
				draft.error = error
				return draft
			default:
				return state
		}
	})
}

export function singUp(email, password) {
	return (dispatch) => {
		dispatch({
			type: SING_UP_REQUEST,
		})

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) =>
				dispatch({
					type: SING_UP_SUCCESS,
					payload: { user },
				})
			)
			.catch((error) =>
				dispatch({
					type: SING_UP_ERROR,
					error,
				})
			)
	}
}
