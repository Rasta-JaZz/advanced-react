import React from "react"
import { Route, NavLink } from "react-router-dom"
import AdminPage from "./components/routes/adminPage"
import AuthPage from "./components/routes/authPage"
import PeoplePage from "./components/routes/peoplePage"
import EventsPage from "./components/routes/eventsPage"
import "./index"

function App(props) {
	return (
		<div>
			<div className="container p-2 naw-bar">
				<div className="d-flex justify-content-around">
					<NavLink to="/admin">
						<button className="btn btn-outline-info">Admin</button>
					</NavLink>
					<NavLink to="/auth">
						<button className="btn btn-outline-info">Login</button>
					</NavLink>
					<NavLink to="/people">
						<button className="btn btn-outline-info">Add people</button>
					</NavLink>
					<NavLink to="/events">
						<button className="btn btn-outline-info">Events</button>
					</NavLink>
				</div>
			</div>
			<div>
				<Route path="/admin" component={AdminPage} />
				<Route path="/auth" component={AuthPage} />
				<Route path="/people" component={PeoplePage} />
				<Route path="/events" component={EventsPage} />
			</div>
		</div>
	)
}

export default App
