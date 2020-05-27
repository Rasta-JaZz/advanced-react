import firebase from "firebase/app"
import "firebase/auth"
import { appName } from "../config"
import { produce } from "immer"
import { all, take, call, put } from "redux-saga/effects"
import { push } from "react-router-redux"
/***********
 ***********
 *constants*/
export const moduleName = "auth"
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`
export const SIGN_OUT_ERROR = `${appName}/${moduleName}/SIGN_OUT_ERROR`
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`
/***********
 ***********
 **actions*/
export function signUpAction(email, password) {
	return {
		type: SIGN_UP_REQUEST,
		payload: { email, password },
	}
}
export function signOut() {
	return {
		type: SIGN_OUT_REQUEST,
	}
}
export function signIn(email, password) {
	return {
		type: SIGN_IN_REQUEST,
		payload: { email, password },
	}
}
/***********
 ***********
 **sagas***/
const auth = firebase.auth()
export const signUpSaga = function* () {
	while (true) {
		const action = yield take(SIGN_UP_REQUEST)
		try {
			const user = yield call(
				[auth, auth.createUserWithEmailAndPassword],
				action.payload.email,
				action.payload.password
			)
			yield put({
				type: SIGN_UP_SUCCESS,
				payload: { user },
			})
		} catch (error) {
			yield put({
				type: SIGN_UP_ERROR,
				payload: error,
			})
		}
	}
}
export const signInSaga = function* () {
	while (true) {
		const action = yield take(SIGN_IN_REQUEST)

		try {
			const user = yield call(
				[auth, auth.signInWithEmailAndPassword],
				action.payload.email,
				action.payload.password
			)
			yield put({
				type: SIGN_IN_SUCCESS,
				payload: { user },
			})
			yield put(push("/auth"))
		} catch (error) {
			yield put({
				type: SIGN_IN_ERROR,
				error,
			})
		}
	}
}
export const signOutSaga = function* () {
	while (true) {
		yield take(SIGN_OUT_REQUEST)
		try {
			yield call([auth, auth.signOut])
			yield put({
				type: SIGN_OUT_SUCCESS,
			})
			yield put(push("/auth"))
		} catch (error) {
			put({
				type: SIGN_OUT_ERROR,
				payload: error,
			})
		}
	}
}

export const watchStatusChanged = function* () {
	try {
		yield call([auth, auth.onIdTokenChanged])
	} catch (user) {
		yield put({
			type: SIGN_OUT_SUCCESS,
			payload: { user },
		})
	}
}
/***********
 ***********
 **reducer*/
const initialUserState = {
	user: null,
	error: null,
	loading: false,
}
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
			case SIGN_IN_SUCCESS:
				draft.user = { ...payload.user }
				return draft
			case SIGN_OUT_REQUEST:
				draft.user = null
				return draft
			default:
				return state
		}
	})
}

export const saga = function* () {
	yield all([signUpSaga(), signInSaga(), watchStatusChanged(), signOutSaga()])
}
