import React from "react"
import SingInForm from "../auth/SingInForm"
import SingUnForm from "../auth/SingUpForm"
import { Route, NavLink } from "react-router-dom"
import "./style.css"
import { connect } from "react-redux"
import { singUp } from "../../ducks/auth"
import Modal from "../common/Modal"

function AuthPage(props) {
	const [showModal, setShowModal] = React.useState(false)
	const handleShow = () => setShowModal(!showModal)
	const handleSingIn = (reset) => reset()
	const handleSingUp = ({ email, password }) => {
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
							render={() => <SingUnForm onSubmit={handleSingUp} />}
						/>
						<Route
							exact
							path="/auth/singIn"
							render={() => <SingInForm onSubmit={handleSingIn} />}
						/>
					</Modal>
				)}
			</div>
		</div>
	)
}

export default connect(null, { singUp })(AuthPage)
