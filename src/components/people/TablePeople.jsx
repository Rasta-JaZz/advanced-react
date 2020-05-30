import React from "react"
import { Table, Column } from "react-virtualized"
import { usersSelector, fetchAllUsers } from "../../ducks/people"
import Loader from "../common/loader"

import "react-virtualized/styles.css"
import { connect } from "react-redux"

function TablePeople(props) {
	const { entities, fetchAllUsers, loading, loaded } = props

	React.useEffect(() => {
		if (!loaded) fetchAllUsers()
	}, [fetchAllUsers, loaded])

	const rowGetter = ({ index }) => {
		return entities[index]
	}

	if (loading) return <Loader />
	return (
		<div
			style={{ boxShadow: "rgb(235, 235, 235) 9px 12px 8px", display: "table" }}
		>
			<Table
				rowCount={entities.length}
				rowHeight={50}
				width={500}
				height={300}
				headerHeight={30}
				rowGetter={rowGetter}
			>
				<Column dataKey="firstName" label="Имя" width={140} />
				<Column dataKey="secondName" label="Фамилия" width={160} />
				<Column dataKey="email" label="email" width={160} />
			</Table>
		</div>
	)
}

export default connect(
	(state) => ({
		entities: usersSelector(state),
		loading: state.users.loading,
		loaded: state.users.loaded,
	}),
	{
		fetchAllUsers,
	}
)(TablePeople)
