import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import store from "./Redux/index"
import { ConnectedRouter as Router } from "connected-react-router"
import history from "./history"
import "bootstrap/dist/css/bootstrap.css"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "./config"

ReactDOM.render(
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<Router history={history}>
				<App />
			</Router>
		</DndProvider>
	</Provider>,
	document.getElementById("root")
)

serviceWorker.unregister()
