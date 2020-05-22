import React from "react"

function Input(props) {
	const {
		label,
		input,
		type,
		meta: { error, touched },
	} = props

	const errorText = touched && error && (
		<div className="invalid-feedback">{error}</div>
	)

	const valid = () => {
		if (error && touched) return "is-invalid"
		else if (touched) return "is-valid"
	}

	return (
		<div>
			<label htmlFor="exampleInputPassword1">{label}</label>
			<input className={`form-control ${valid()}`} {...input} type={type} />
			{errorText}
		</div>
	)
}

export default Input
