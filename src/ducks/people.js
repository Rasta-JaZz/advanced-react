import firebase from "firebase/app"
import "firebase/database"
import { appName } from "../config"
import { produce } from "immer"
import { v4 as uid } from "uuid"
import {
	put,
	takeEvery,
	call,
	spawn,
	take,
	race,
	delay,
} from "redux-saga/effects"
import { eventChannel } from "redux-saga"
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
export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

/**** 
 selectors
 ****/
export const usersModuleSelector = (state) => state.users
export const usersSelector = createSelector(usersModuleSelector, (users) => {
	return Object.values(users.entities)
})
export const participants = createSelector(usersSelector, (users) => {
	return users.map((user) =>
		!!user.events
			? {
					...user,
					events: Object.values(user.events),
			  }
			: { ...user, events: [] }
	)
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

export function addEventToPerson(eventId, personId) {
	return {
		type: ADD_EVENT_REQUEST,
		payload: { eventId, personId },
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

export const addEventToPersonSaga = function* (action) {
	const { eventId, personId } = action.payload

	const eventRef = firebase.database().ref(`people/${personId}/events`)

	yield eventRef.push(eventId)

	const personEvents = yield call([eventRef, eventRef.once], "value")

	yield put({
		type: ADD_EVENT_SUCCESS,
		payload: Object.values(personEvents.val()),
		person: personId,
	})
}

const createPeopleSocket = () =>
	eventChannel((emitter) => {
		const callback = (data) => emitter({ data })
		ref.on("value", callback)

		return () => {
			console.log("unsubscribe")

			ref.off("value", callback)
		}
	})

export const realtimeSync = function* () {
	const chan = yield call(createPeopleSocket)
	try {
		while (true) {
			const { data } = yield take(chan)

			yield put({
				type: FETCH_USER_SUCCESS,
				payload: keyToIds(data.val()),
			})
		}
	} finally {
		yield call([chan, chan.close])
		console.log("channel closed ")
	}
}

export const cancelableSync = function* () {
	yield race({
		sync: realtimeSync(),
		delay: delay(6000),
	})
}
/**** 
 reducer
 ****/

const initialUserState = {
	entities: {},
	error: null,
	loading: false,
	loaded: false,
	events: [],
}

export default function userReducer(state = initialUserState, action) {
	const { type, payload, person } = action

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
			case ADD_EVENT_SUCCESS:
				draft.entities[person].events = [...payload]
				return draft
			default:
				return draft
		}
	})
}

export const saga = function* () {
	yield spawn(realtimeSync)

	yield takeEvery(ADD_USER_REQUEST, addUserSaga)
	yield takeEvery(ADD_USER_TO_DB_REQUEST, addUserToDb)
	yield takeEvery(FETCH_USER_REQUEST, fetchUserSaga)
	yield takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga)
}
