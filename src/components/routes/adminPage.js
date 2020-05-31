import React from "react"
import { Redirect, useLocation } from "react-router-dom"
import { connect } from "react-redux"
import { selectedSelector } from "../../ducks/events"
import ListPeople from "../people/ListPeople"
import EventList from "../events/SelectedEvents"
import Loader from "../common/loader"

function AdminPage(props) {
	const { loggedIn, loaded } = props

	let location = useLocation()
	if (!loaded) return <Loader />
	if (location.pathname === "/admin" && !loggedIn)
		return <Redirect to="/unregister" />
	return (
		<div>
			<h2 style={{ textAlign: "center" }}>AdminPage</h2>
			<div className="container d-flex justify-content-between mt-5">
				<div>
					<ListPeople />
				</div>
				<div>
					<h2>Drug'n'Drop</h2>
				</div>
				<div>
					{!props.selectedEvents && (
						<div>
							<h3>Нет выбранных конференций.</h3>
							<h4> Выберите конференции в талице</h4>
						</div>
					)}
					<EventList />
				</div>
			</div>
		</div>
	)
}

export default connect((state) => ({
	loggedIn: !!state.auth.user,
	selectedEvents: !!selectedSelector(state).length,
	loaded: state.auth.loaded,
}))(AdminPage)
