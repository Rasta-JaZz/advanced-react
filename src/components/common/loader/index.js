import React from "react"
import "./style.css"

function Loader(props) {
	return (
		<div className="loader-wrapper">
			<div className="spinner-border text-success" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

export default Loader
