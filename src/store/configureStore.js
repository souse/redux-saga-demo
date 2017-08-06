import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const sagaMiddleware = createSagaMiddleware()

const middlewares = [routerMiddleware(history), sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares))

// const history = syncHistoryWithStore(browserHistory, store)
const runSaga = sagaMiddleware.run

export { history, runSaga }
export default store
