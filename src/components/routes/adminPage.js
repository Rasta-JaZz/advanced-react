import React from "react"
import { Redirect, useLocation } from "react-router-dom"
import { connect } from "react-redux"
import ListPeople from "../../people/ListPeople"
import EventList from "../events/SelectedEvents"

function AdminPage(props) {
	const { loggedIn } = props

	let location = useLocation()

	// if (location.pathname === "/admin" && !loggedIn)
	// 	return <Redirect to="/unregister" />
	return (
		<div>
			<h2 style={{ textAlign: "center" }}>AdminPage</h2>
			<div className="container d-flex justify-content-between mt-5">
				<div>
					<ListPeople />
				</div>
				<div>
					<EventList />
				</div>
			</div>
		</div>
	)
}

export default connect((state) => ({
	loggedIn: !!state.auth.user,
}))(AdminPage)
