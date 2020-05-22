import React from "react"
import { reduxForm, Field } from "redux-form"
import Input from "./Input"
import validate from "../utils/validator"
import "./style.css"

function SingInForm(props) {
	const { handleSubmit } = props

	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<form onSubmit={handleSubmit} className="auth-form">
					<h3>Sing In</h3>
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
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}

export default reduxForm({
	form: "singIn",
	validate,
})(SingInForm)
