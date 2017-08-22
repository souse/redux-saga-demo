import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import App from './containers/App'
import store, { history, runSaga } from './store/configureStore'
import rootSaga from './sagas'

import Login from 'COMPONENT/Login'
import Person from 'COMPONENT/Person'

runSaga(rootSaga)

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Route exact path="/" component={Login}/>
       			<Route path="/person" component={Person}/>
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)
