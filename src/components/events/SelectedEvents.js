import React from "react"
import { List } from "react-virtualized"
import { connect } from "react-redux"
import { selectedSelector } from "../../ducks/events"
import SelectedEventCard from "./SelectedEventCard"

function EventList(props) {
	const { events, selectedSelector } = props

	return (
		<div className="container">
			{events.map((event) => (
				<SelectedEventCard event={event} key={event.id} />
			))}
		</div>
	)
}

export default connect((state) => ({
	events: selectedSelector(state),
}))(EventList)
