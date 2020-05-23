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

	const validation = () => {
		if (error && touched) return "is-invalid"
		else if (touched) return "is-valid"
	}

	return (
		<div>
			<label htmlFor="exampleInputPassword1">{label}</label>
			<input
				className={`form-control ${validation()}`}
				{...input}
				type={type}
			/>
			{errorText}
		</div>
	)
}

export default Input
