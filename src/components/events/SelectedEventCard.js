import React from "react"
import { DropTarget } from "react-dnd"
import { connect } from "react-redux"
import { addEventToPerson, participants } from "../../ducks/people"

function EventCard(props) {
	const { title, when, where } = props.event

	const dropStyle = {
		border: `1px solid ${props.hovered ? "green" : "white"}`,
		borderRadius: 5,
	}

	const getParticipants = () => {
		return props.participants.map((person) => (
			<span key={person.id}>{person.firstName}, </span>
		))
	}

	return props.connectDropTarget(
		<div style={{ ...dropStyle }}>
			<h3>{title}</h3>
			<p>
				{where}, {when}
			</p>
			<p>Participants: {getParticipants()}</p>
		</div>
	)
}
const spec = {
	drop(props, monitor) {
		const personId = monitor.getItem().id
		const eventId = props.event.id

		props.addEventToPerson(eventId, personId)

		return { eventId }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	hovered: monitor.isOver(),
})

export default connect(
	(state, props) => ({
		participants: participants(state, props).filter((person) =>
			person.events.includes(props.event.id)
		),
	}),
	{
		addEventToPerson,
	}
)(DropTarget(["person"], spec, collect)(EventCard))
