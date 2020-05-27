import React from "react"
import SignInForm from "../auth/SignInForm"
import SignUnForm from "../auth/SignUpForm"
import { Route, NavLink, useLocation } from "react-router-dom"
import "./style.css"
import { connect } from "react-redux"
import { signUpAction, signOut, signIn } from "../../ducks/auth"
import Modal from "../common/Modal"

function AuthPage(props) {
	const [showModal, setShowModal] = React.useState(false)
	const handleShow = () => setShowModal(!showModal)

	const { signIn, signOut, signedIn, signUpAction } = props

	const handleSignIn = ({ email, password }) => signIn(email, password)
	const handleSignUp = ({ email, password }) => signUpAction(email, password)

	let location = useLocation()

	React.useEffect(() => {
		location.pathname === "/auth/signIn" || location.pathname === "/auth/signUp"
			? setShowModal(true)
			: setShowModal(false)
	}, [location.pathname])

	const getLinks = () => {
		return signedIn ? (
			<button className="btn btn-info" onClick={signOut}>
				выход
			</button>
		) : (
			<div className="d-flex col-2 flex-column">
				<NavLink to="/auth/signIn">
					<button
						className="btn btn-primary button-width_150"
						onClick={() => handleShow()}
					>
						Вход
					</button>
				</NavLink>
				<NavLink to="/auth/signUp">
					<button
						className="btn btn-secondary button-width_150"
						onClick={() => handleShow()}
					>
						Регистация
					</button>
				</NavLink>
			</div>
		)
	}

	console.log("render :>> ")
	return (
		<div>
			<div className="container justify-content-center">
				<div className="row align-items-start">
					<div className="col">
						<div>
							<h3>AuthPage</h3>
						</div>
						<div>{getLinks()}</div>
					</div>
				</div>
			</div>
			<div>
				{showModal && (
					<Modal show={handleShow}>
						<Route
							path="/auth/signUp"
							render={() => <SignUnForm onSubmit={handleSignUp} />}
						/>
						<Route
							path="/auth/signIn"
							render={() => <SignInForm onSubmit={handleSignIn} />}
						/>
					</Modal>
				)}
			</div>
		</div>
	)
}

export default connect(
	(state) => ({
		signedIn: !!state.auth.user,
	}),
	{ signUpAction, signOut, signIn },
	null,
	{ pure: false }
)(AuthPage)
