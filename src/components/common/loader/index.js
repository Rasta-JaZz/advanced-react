import React from "react"
import ReactDOM from "react-dom"
import "./style.css"

class Loader extends React.Component {
	componentWillMount() {
		this.portal = document.createElement("div")
		document.body.appendChild(this.portal)
	}
	componentWillUnmount() {
		document.body.removeChild(this.portal)
	}

	render() {
		return ReactDOM.createPortal(
			<div className="loader-wrapper">
				<div className="spinner-border text-light" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>,
			this.portal
		)
	}
}

export default Loader
