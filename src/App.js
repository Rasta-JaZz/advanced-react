import React from "react"
import { Route } from "react-router-dom"
import AdminPage from "./components/routes/adminPage"
import AuthPage from "./components/routes/authPage"
import SingInForm from "./components/auth/SingInForm"
import SingUnForm from "./components/auth/SingUpForm"

function App(props) {
	return (
		<div>
			<Route path="/admin" component={AdminPage} />
			<Route path="/auth" component={AuthPage} />
		</div>
	)
}

export default App
