import emailValidator from "email-validator"

const validate = ({ email, password, repeatPassword }) => {
	const errors = {}
	if (!email) errors.email = "обязательное поле"
	else if (!emailValidator.validate(email))
		errors.email = "некорректный email адресс"
	if (!password) errors.password = "введите пароль"
	else if (password.length < 8)
		errors.password = "пароль должен содержать более 8 символов"

	if (!repeatPassword) errors.repeatPassword = "обязательное поле"
	else if (password !== repeatPassword)
		errors.repeatPassword = "пароли не совподают"
	return errors
}

export default validate
