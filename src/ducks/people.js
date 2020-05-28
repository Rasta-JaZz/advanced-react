import firebase from "firebase/app"
import "firebase/database"
import { appName } from "../config"
import { produce } from "immer"
import { v4 as uid } from "uuid"
import { put, takeEvery, call } from "redux-saga/effects"
import keyToIds from "../components/utils/keyToIds"
import { createSelector } from "reselect"

/****
 constants
 ****/

export const moduleName = "users"
export const prefix = `${appName}/${moduleName}`
export const ADD_USER_REQUEST = `${prefix}/ADD_USER_REQUEST`
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`
export const ADD_USER = `${prefix}/ADD_USER`
export const ADD_USER_TO_DB_REQUEST = `${prefix}/ADD_USER_TO_DB_REQUEST`
export const ADD_USER_TO_DB_SUCCESS = `${prefix}/ADD_USER_TO_DB_SUCCESS`
export const ADD_USER_TO_DB_ERROR = `${prefix}/ADD_USER_TO_DB_ERROR`
export const FETCH_USER_REQUEST = `${prefix}/FETCH_USER_REQUEST`
export const FETCH_USER_SUCCESS = `${prefix}/FETCH_USER_SUCCESS`
export const FETCH_USER_ERROR = `${prefix}/FETCH_USER_ERROR`

/**** 
 selectors
 ****/
export const usersModuleSelector = (state) => state.users.entities
export const usersSelector = createSelector(usersModuleSelector, (users) => {
	return Object.values(users)
})

/**** 
 action
 ****/

export function addUser(user) {
	return {
		type: ADD_USER_REQUEST,
		payload: { user },
	}
}

export function addToDb(user) {
	return {
		type: ADD_USER_TO_DB_REQUEST,
		payload: { user },
	}
}

export function fetchAllUsers() {
	return {
		type: FETCH_USER_REQUEST,
	}
}

/**** 
 sagas
 ****/

const ref = firebase.database().ref("people")

export const fetchUserSaga = function* () {
	try {
		const data = yield call([ref, ref.once], "value")

		yield put({
			type: FETCH_USER_SUCCESS,
			payload: keyToIds(data.val()),
		})
	} catch (error) {
		yield put({
			type: FETCH_USER_ERROR,
			payload: error,
		})
	}
}

export const addUserSaga = function* (action) {
	const id = yield call(uid)

	yield put({
		type: ADD_USER,
		payload: { ...action.payload, id },
	})
}

export const addUserToDb = function* (action) {
	try {
		yield ref.push(action.payload.user)
		yield put({
			type: ADD_USER_TO_DB_SUCCESS,
		})
	} catch (error) {
		yield put({
			type: ADD_USER_TO_DB_ERROR,
			payload: error,
		})
	}
}

/**** 
 reducer
 ****/

const initialUserState = {
	entities: {},
	error: null,
	loading: false,
	loaded: false,
}

export default function userReducer(state = initialUserState, action) {
	const { type, payload } = action

	return produce(state, (draft) => {
		switch (type) {
			case FETCH_USER_REQUEST:
				draft.loading = true
				return draft
			case FETCH_USER_SUCCESS:
				draft.entities = { ...payload }
				draft.loading = false
				draft.loaded = true
				return draft
			case ADD_USER:
				draft.push({ ...payload.user, id: payload.id })
				return draft
			case ADD_USER_TO_DB_ERROR:
				draft.error = payload.error
				return draft
			default:
				return draft
		}
	})
}

export const saga = function* () {
	yield takeEvery(ADD_USER_REQUEST, addUserSaga)
	yield takeEvery(ADD_USER_TO_DB_REQUEST, addUserToDb)
	yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga)
}
