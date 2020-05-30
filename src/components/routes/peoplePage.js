import React from "react"
import NewPeopleForm from "../people/NewPeopleForm"
import { connect } from "react-redux"
import { addToDb } from "../../ducks/people"
import TablePeople from "../people/TablePeople"

function PeoplePage(props) {
	return (
		<div className="container ">
			<h2>Пользователи </h2>
			<div className="container d-flex justify-content-between">
				<NewPeopleForm onSubmit={(value) => props.addToDb(value)} />
				<TablePeople />
			</div>
		</div>
	)
}

export default connect(null, {
	addToDb,
})(PeoplePage)
