import React from "react"
import { reduxForm, Field } from "redux-form"
import validate from "../utils/validator"
import Input from "./Input"
import "./style.css"

function SingUnForm(props) {
	const { handleSubmit } = props
	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<form onSubmit={handleSubmit} className="auth-form">
					<h3>Sing Up</h3>
					<div className="form-group">
						<Field
							type="email"
							name="email"
							component={Input}
							label={"Email address"}
						/>
					</div>
					<div className="form-group">
						<Field
							type="password"
							name="password"
							component={Input}
							label={"Password"}
						/>
					</div>
					<div className="form-group">
						<Field
							type="password"
							name="repeatPassword"
							component={Input}
							label={"Repeat password "}
						/>
					</div>
					<button className="btn btn-primary">Register</button>
				</form>
			</div>
		</div>
	)
}

export default reduxForm({
	form: "signUp",
	validate,
})(SingUnForm)
