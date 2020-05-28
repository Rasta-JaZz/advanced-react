import React from "react"
import { connect } from "react-redux"
import { lazyFetch, selectEvents, selectedIdSelector } from "../../ducks/events"
import { arrEntitiesSelector } from "../../ducks/events"
import LoaderMini from "../common/loader/LoaderMini"
import { Table, Column, InfiniteLoader } from "react-virtualized"
import "react-virtualized/styles.css"
import "./style.css"

function EventsTable(props) {
	const { lazyFetch, entities, loading, selectEvents, selected } = props

	React.useEffect(() => {
		lazyFetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const rowGetter = ({ index }) => entities[index]

	const cellRenderer = ({ rowData }) => {
		return (
			<div>
				<a href={rowData.url}>Go to web </a>{" "}
			</div>
		)
	}
	const rowLoaded = ({ index }) => index < entities.length

	const loadMoreRows = () => {
		lazyFetch()
	}

	const rowClick = ({ index }) => {
		selectEvents(entities[index].id)
	}

	return (
		<div className="container">
			<InfiniteLoader
				rowCount={entities.length + 1}
				loadMoreRows={loadMoreRows}
				isRowLoaded={rowLoaded}
			>
				{({ onRowsRendered, registerChild }) => (
					<Table
						className="table-main"
						ref={registerChild}
						overscanRowCount={5}
						rowCount={entities.length}
						rowGetter={rowGetter}
						width={1130}
						headerHeight={50}
						height={400}
						rowHeight={40}
						onRowsRendered={onRowsRendered}
						rowClassName="table-row "
						onRowClick={rowClick}
					>
						<Column dataKey="title" label="конференция" width={350} />
						<Column dataKey="where" label="Когда" width={250} />
						<Column dataKey="when" label="Где" width={250} />
						<Column
							cellRenderer={cellRenderer}
							dataKey="url"
							label="Web"
							width={250}
						/>
					</Table>
				)}
			</InfiniteLoader>
			{loading && <LoaderMini />}
			<div>
				{Boolean(selected.length) && (
					<div style={{ marginTop: 25, textAlign: "right" }}>
						Выбрано {selected.length} конференций
					</div>
				)}
			</div>
		</div>
	)
}

export default connect(
	(state) => ({
		loaded: state.events.loaded,
		entities: arrEntitiesSelector(state),
		loading: state.events.loading,
		selected: selectedIdSelector(state),
	}),
	{ lazyFetch, selectEvents }
)(EventsTable)
