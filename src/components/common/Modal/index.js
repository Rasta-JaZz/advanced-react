import React from "react"
import ReactDOM from "react-dom"
import "./style.css"

class Modal extends React.Component {
	componentWillMount() {
		this.portal = document.createElement("div")
		document.body.appendChild(this.portal)
	}
	componentWillUnmount() {
		document.body.removeChild(this.portal)
	}
	render() {
		return ReactDOM.createPortal(
			<div className="modal-window">
				<button
					className="btn btn-primary modal__close-button"
					onClick={this.props.show}
				>
					закрыть
				</button>
				<div className="modal-wrapper">{this.props.children}</div>
			</div>,
			this.portal
		)
	}
}

export default Modal
