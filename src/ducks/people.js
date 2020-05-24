import { appName } from "../config"
import { produce } from "immer"
import { v4 as uid } from "uuid"
import { put, takeEvery } from "redux-saga/effects"

export const moduleName = "people"
export const prefix = `${appName}/${moduleName}`
export const ADD_USER_REQUEST = `${prefix}/ADD_USER_REQUEST`
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`
export const ADD_USER = `${prefix}/ADD_USER`

export function addUser(user) {
	return {
		type: ADD_USER_REQUEST,
		payload: { user },
	}
}

const addUserSaga = function* (action) {
	const id = uid()
	yield put({
		type: ADD_USER,
		payload: { ...action.payload.user, id: id },
	})
}

const initialUserState = []

export default function userReducer(state = initialUserState, action) {
	const { type, payload } = action

	return produce(state, (draft) => {
		switch (type) {
			case ADD_USER:
				draft.push({ ...payload })
				return draft
			default:
				return draft
		}
	})
}

export const saga = function* () {
	yield takeEvery(ADD_USER_REQUEST, addUserSaga)
}
