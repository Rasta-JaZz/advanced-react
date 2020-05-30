import React from "react"
import { DragSource } from "react-dnd"

function PersonCard(props) {
	const { person, style, connectDragSource, isDragging } = props

	const dragStyle = {
		opacity: isDragging ? 0 : 1,
	}

	return connectDragSource(
		<div>
			<div style={{ width: 200, height: 100, ...dragStyle, ...style }}>
				<h3>
					{person.firstName}&nbsp;{person.secondName}
				</h3>
				<p>{person.email}</p>
			</div>
		</div>
	)
}

const spec = {
	beginDrag(props) {
		return {
			id: props.person.id,
		}
	},
	endDrag(props, monitor) {
		// const personId = props.person.id
		// const eventId = monitor.getDropResult().eventId
	},
}
const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
})

export default DragSource("person", spec, collect)(PersonCard)
