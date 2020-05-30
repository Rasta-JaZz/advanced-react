import React from "react"
import { List } from "react-virtualized"
import "react-virtualized/styles.css"
import PersonCard from "./PersonCard.jsx"
import { connect } from "react-redux"
import { usersSelector, fetchAllUsers } from "../../ducks/people"

function ListPeople(props) {
	const { people, fetchAllUsers, loaded } = props

	React.useEffect(() => {
		if (!loaded) fetchAllUsers()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const rowRenderer = ({ index, key, style }) => (
		<PersonCard person={people[index]} key={key} style={style} />
	)

	return (
		<div style={{ marginTop: 30 }}>
			<List
				rowCount={people.length}
				rowHeight={100}
				height={300}
				width={300}
				rowRenderer={rowRenderer}
			/>
		</div>
	)
}

export default connect(
	(state) => ({
		people: usersSelector(state),
		loaded: state.users.loaded,
	}),
	{ fetchAllUsers }
)(ListPeople)
