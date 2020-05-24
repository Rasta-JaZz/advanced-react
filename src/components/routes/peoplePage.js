import React from "react"
import NewPeopleForm from "../../people/NewPeopleForm"
import { connect } from "react-redux"
import { addUser } from "../../ducks/people"

function PeoplePage(props) {
	return (
		<div className="container ">
			<h2>Пользователи </h2>
			<NewPeopleForm onSubmit={(value) => props.addUser(value)} />
		</div>
	)
}

export default connect(null, {
	addUser,
})(PeoplePage)
