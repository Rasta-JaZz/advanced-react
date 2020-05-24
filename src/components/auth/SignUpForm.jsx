import React from "react"
import { reduxForm, Field } from "redux-form"
import validate from "../utils/validator"
import Input from "../common/Input"
import Loader from "../common/loader"
import "./style.css"

function SignUnForm(props) {
	const { handleSubmit, reset, loading } = props
	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<form
					onSubmit={(value) => {
						handleSubmit(value)
						reset()
					}}
					className="auth-form"
				>
					<h3>Регистрация</h3>
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
					<div className="d-flex justify-content-between">
						<button className="btn btn-primary">Register</button>
						{loading && <Loader />}
					</div>
				</form>
			</div>
		</div>
	)
}

export default reduxForm({
	form: "signUp",
	validate,
})(SignUnForm)
