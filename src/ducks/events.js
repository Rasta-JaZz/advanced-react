import firebase from "firebase/app"
import "firebase/database"
import { appName } from "../config"
import { produce } from "immer"
import { put, all, takeEvery, call, select, take } from "redux-saga/effects"
import { createSelector } from "reselect"
import keyToIds from "../components/utils/keyToIds"

/**** 
 constants
 ****/
export const moduleName = "event"
export const ALL_DATA_REQUEST = `${appName}/${moduleName}/ALL_DATA_REQUEST`
export const ALL_DATA_SUCCESS = `${appName}/${moduleName}/ALL_DATA_SUCCESS`
export const LAZY_FETCH_REQUEST = `${appName}/${moduleName}/LAZY_FETCH_REQUEST`
export const LAZY_FETCH_SUCCESS = `${appName}/${moduleName}/LAZY_FETCH_SUCCESS`
export const LAZY_FETCH_START = `${appName}/${moduleName}/LAZY_FETCH_START`
/**** 
 selectors
 ****/
export const stateSelector = (state) => state.events
export const entitiesSelector = (state) => state.events.entities
export const arrEntitiesSelector = createSelector(entitiesSelector, (arr) => {
	const entities = Object.values(arr)
	return entities
})
/**** 
 actions
 ****/
export function lazyFetch() {
	return {
		type: LAZY_FETCH_REQUEST,
	}
}
export function allFetchRequest() {
	return {
		type: ALL_DATA_REQUEST,
	}
}

/**** 
 reducer
 ****/
const initialState = {
	entities: {},
	loading: false,
	loaded: false,
}
export default function reducer(state = initialState, action) {
	const { type, payload } = action

	return produce(state, (draft) => {
		switch (type) {
			// case ALL_DATA_REQUEST:
			case LAZY_FETCH_START:
				draft.loading = true
				return draft
			case ALL_DATA_SUCCESS:
				draft.entities = payload
				draft.loading = false
				draft.loaded = true
				return draft
			case LAZY_FETCH_SUCCESS:
				draft.loading = false
				draft.entities = { ...draft.entities, ...payload }
				draft.loaded = true
				return draft
			default:
				return draft
		}
	})
}
/**** 
 sagas
 ****/
export const lazyFetchSaga = function* () {
	while (true) {
		yield take(LAZY_FETCH_REQUEST)
		const state = yield select(stateSelector)

		const keys = Object.keys(state.entities)
		const lastEvent = keys[keys.length - 1]

		if (state.loading) continue

		yield put({
			type: LAZY_FETCH_START,
		})

		const ref = firebase
			.database()
			.ref("events")
			.orderByKey()
			.limitToFirst(25)
			.startAt(lastEvent ? lastEvent : "")

		const data = yield call([ref, ref.once], "value")

		yield put({
			type: LAZY_FETCH_SUCCESS,
			payload: data.val(),
		})
	}
}

export const allFetchDataSage = function* () {
	const ref = firebase.database().ref("events")

	const data = yield call([ref, ref.once], "value")
	keyToIds(data.val())
	yield put({
		type: ALL_DATA_SUCCESS,
		payload: keyToIds(data.val()),
	})
}

export function* saga() {
	yield all([takeEvery(ALL_DATA_REQUEST, allFetchDataSage), lazyFetchSaga()])
}
