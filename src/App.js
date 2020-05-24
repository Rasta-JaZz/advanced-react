import React from "react"
import { Route } from "react-router-dom"
import AdminPage from "./components/routes/adminPage"
import AuthPage from "./components/routes/authPage"
import PeoplePage from "./components/routes/peoplePage"
function App(props) {
	return (
		<div>
			<Route path="/admin" component={AdminPage} />
			<Route path="/auth" component={AuthPage} />
			<Route path="/people" component={PeoplePage} />
		</div>
	)
}

export default App
