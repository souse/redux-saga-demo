import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './containers/App'
import store, { history, runSaga } from './store/configureStore'
import rootSaga from './sagas'

import Login from 'COMPONENT/Login'

runSaga(rootSaga)

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/">
				<IndexRedirect to="/login" />
				<Route component={App}>
					<Route path="/login" component={Login} />	
				</Route>	
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)
