import React from "react"
import { Link } from "react-router-dom"

function UnregisterPage(props) {
	return (
		<div className="container">
			<h3>
				Что бы просматривать страницу необходимо{" "}
				<Link to="/auth/signIn">войти</Link> или{" "}
				<Link to="/auth/signUp">зарегистрироватьсья</Link>
			</h3>
		</div>
	)
}

export default UnregisterPage
