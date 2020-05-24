import React from "react"
import SignInForm from "../auth/SignInForm"
import SignUnForm from "../auth/SignUpForm"
import { Route, NavLink } from "react-router-dom"
import "./style.css"
import { connect } from "react-redux"
import { signUp } from "../../ducks/auth"
import Modal from "../common/Modal"

function AuthPage(props) {
	const [showModal, setShowModal] = React.useState(false)
	const handleShow = () => setShowModal(!showModal)
	const handleSignIn = (reset) => reset()
	const handleSignUp = ({ email, password }) => {
		props.singUp(email, password)
	}

	return (
		<div>
			<div className="container justify-content-center">
				<div className="row align-items-start">
					<div className="col">
						<div>
							<h3>AuthPage</h3>
						</div>
						<div>
							<div className="d-flex col-2 flex-column">
								<NavLink to="/auth/singIn">
									<button
										className="btn btn-primary button-width_150"
										onClick={() => handleShow()}
									>
										Вход
									</button>
								</NavLink>
								<NavLink to="/auth/singUp">
									<button
										className="btn btn-secondary button-width_150"
										onClick={() => handleShow()}
									>
										Регистация
									</button>
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				{showModal && (
					<Modal show={handleShow}>
						<Route
							path="/auth/singUp"
							render={() => <SignUnForm onSubmit={handleSignUp} />}
						/>
						<Route
							exact
							path="/auth/singIn"
							render={() => <SignInForm onSubmit={handleSignIn} />}
						/>
					</Modal>
				)}
			</div>
		</div>
	)
}

export default connect(null, { signUp })(AuthPage)
