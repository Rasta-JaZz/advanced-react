import React from "react"
import EventsTable from "../events/EventTable"

function EventsPage(props) {
	return (
		<div>
			<h2 style={{ textAlign: "center" }}>Events Page</h2>
			<EventsTable />
		</div>
	)
}

export default EventsPage
