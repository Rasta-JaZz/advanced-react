import React from "react"
import { reduxForm, Field } from "redux-form"
import Input from "../common/Input"
import validate from "../utils/validator"
import Loader from "../common/loader"
import { connect } from "react-redux"
import "./style.css"

function SignInForm(props) {
	const { handleSubmit, loading } = props

	return (
		<div className="container">
			<div className="row justify-content-md-center">
				<form onSubmit={handleSubmit} className="auth-form">
					<h3>Вход</h3>
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
					<div className="d-flex justify-content-between">
						<button className="btn btn-primary">Submit</button>
						{loading && <Loader />}
					</div>
				</form>
			</div>
		</div>
	)
}

export default reduxForm({
	form: "singIn",
	validate,
})(
	connect((state) => ({
		loading: state.authReducer.loading,
	}))(SignInForm)
)
