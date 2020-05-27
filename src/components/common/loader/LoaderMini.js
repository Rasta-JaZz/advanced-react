import React from "react"
import "./style.css"

function LoaderMini() {
	return (
		<div className="spinner-border text-success" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	)
}

export default LoaderMini
