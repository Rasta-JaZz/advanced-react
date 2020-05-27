import React from "react"
import { connect } from "react-redux"
import { lazyFetch } from "../../ducks/events"
import { arrEntitiesSelector } from "../../ducks/events"
import LoaderMini from "../common/loader/LoaderMini"
import { Table, Column, InfiniteLoader } from "react-virtualized"
import "react-virtualized/styles.css"
import "./style.css"

function EventsPage(props) {
	const { loaded, lazyFetch, entities, loading } = props

	React.useEffect(() => {
		if (!loaded) lazyFetch()
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

	// if (loading) return <Loader />

	return (
		<div className="container">
			<h2>Events page {loading && <LoaderMini />}</h2>

			<div style={{ border: "1px #b3b3b3c7 solid" }}>
				<InfiniteLoader
					rowCount={entities.length + 1}
					loadMoreRows={loadMoreRows}
					isRowLoaded={rowLoaded}
				>
					{({ onRowsRendered, registerChild }) => (
						<Table
							ref={registerChild}
							overscanRowCount={1}
							rowCount={entities.length}
							rowGetter={rowGetter}
							width={1130}
							headerHeight={40}
							height={350}
							rowHeight={40}
							onRowsRendered={onRowsRendered}
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
			</div>
		</div>
	)
}

export default connect(
	(state) => ({
		loaded: state.events.loaded,
		entities: arrEntitiesSelector(state),
		loading: state.events.loading,
	}),
	{ lazyFetch }
)(EventsPage)
