import React from "react"
import { Route, NavLink } from "react-router-dom"
import AdminPage from "./components/routes/adminPage"
import AuthPage from "./components/routes/authPage"
import PeoplePage from "./components/routes/peoplePage"
import EventsPage from "./components/routes/eventsPage"
import UnregisterPage from "./components/routes/unregisterPage"
import "./index"

function App(props) {
	return (
		<div>
			<div className="container naw-bar h-3">
				<div className="d-flex justify-content-around">
					<NavLink
						to="/admin"
						className="NavLink-style"
						activeClassName="NavLink-style__active"
					>
						<div className="link-block">admin</div>
					</NavLink>
					<NavLink
						to="/auth"
						className="NavLink-style"
						activeClassName="NavLink-style__active"
					>
						<div className="link-block">Log in</div>
					</NavLink>
					<NavLink
						to="/people"
						className="NavLink-style"
						activeClassName="NavLink-style__active"
					>
						<div className="link-block">Add people</div>
					</NavLink>
					<NavLink
						to="/events"
						className="NavLink-style"
						activeClassName="NavLink-style__active"
					>
						<div className="link-block">Event table</div>
					</NavLink>
				</div>
			</div>
			<div>
				<Route path="/admin" component={AdminPage} />
				<Route path="/auth" component={AuthPage} />
				<Route path="/people" component={PeoplePage} />
				<Route path="/events" component={EventsPage} />
				<Route path="/unregister" component={UnregisterPage} />
			</div>
		</div>
	)
}

export default App
