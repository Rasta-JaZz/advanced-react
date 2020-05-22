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
import "./config"

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
)

serviceWorker.unregister()
