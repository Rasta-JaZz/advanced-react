import { addUserSaga, ADD_USER, ADD_USER_REQUEST } from "./people"
import { call, put } from "redux-saga/effects"
import { v4 as uid } from "uuid"

it("should dispatch person with id", () => {
	const person = {
		firstName: "egor",
		secondName: "zosimov",
		email: "test@test.ru",
	}

	const saga = addUserSaga({
		type: ADD_USER_REQUEST,
		payload: { person },
	})

	expect(saga.next().value).toEqual(call(uid))

	const id = uid()

	expect(saga.next(id).value).toEqual(
		put({
			type: ADD_USER,
			payload: { person, id },
		})
	)
})
