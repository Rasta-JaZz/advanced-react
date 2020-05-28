import React from "react"
import { reduxForm, Field } from "redux-form"
import Input from "../components/common/Input"
import validate from "../components/utils/validator"

function NewPeopleForm(props) {
	const { reset, handleSubmit } = props
	return (
		<div>
			<div className="container">
				<div className="row justify-content-md-center">
					<form
						className="auth-form"
						onSubmit={(value) => {
							handleSubmit(value)
							reset()
						}}
					>
						<h3>Добвить пользователя</h3>
						<div className="form-group">
							<Field name="firstName" component={Input} label={"Имя"} />
						</div>
						<div className="form-group">
							<Field name="secondName" component={Input} label={"фамиия"} />
						</div>
						<div className="form-group">
							<Field name="email" component={Input} label={"Email"} />
						</div>
						<div className="d-flex justify-content-between">
							<button className="btn btn-primary">Добавить</button>
						</div>
					</form>
					{/* <button onClick={() => props.}>reset</button> */}
				</div>
			</div>
		</div>
	)
}

export default reduxForm({
	form: "newPeopleForm",
	validate,
})(NewPeopleForm)
