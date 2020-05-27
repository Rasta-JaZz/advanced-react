import { saga as peopleSaga } from "../ducks/people"
import { saga as authSaga } from "../ducks/auth"
import { saga as fetchDataSaga } from "../ducks/events"
import { all } from "redux-saga/effects"

export default function* rootSaga() {
	yield all([peopleSaga(), authSaga(), fetchDataSaga()])
}
