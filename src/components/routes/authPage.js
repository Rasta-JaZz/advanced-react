import React from "react"
import SingInForm from "../auth/SingInForm"
import SingUnForm from "../auth/SingUpForm"
import { Route, NavLink } from "react-router-dom"
import "./style.css"

function AuthPage(props) {
	const handleSingIn = (value) => console.log("value :>> ", value)
	const handleSingUp = (value) => console.log("value :>> ", value)

	return (
		<div className="container justify-content-center">
			<div className="row align-items-start">
				<div className="col">
					<div>
						<h3>AuthPage</h3>
					</div>
					<div>
						<div className="d-flex col-2 flex-column">
							<NavLink to="/auth/singIn">
								<button className="btn btn-primary button-width_150">
									Вход
								</button>
							</NavLink>
							<NavLink to="/auth/singUp">
								<button className="btn btn-secondary button-width_150">
									Регистация
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			</div>

			<Route
				exact
				path="/auth/singIn"
				render={() => <SingInForm onSubmit={handleSingIn} />}
			/>
			<Route
				exact
				path="/auth/singUp"
				render={() => <SingUnForm onSubmit={handleSingUp} />}
			/>
		</div>
	)
}

export default AuthPage
