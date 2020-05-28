import React from "react"

function PersonCard(props) {
	const { person, style } = props
	return (
		<div>
			<div style={{ width: 200, height: 100, ...style }}>
				<h3>
					{person.firstName}&nbsp;{person.secondName}
				</h3>
				<p>{person.email}</p>
			</div>
		</div>
	)
}

export default PersonCard
