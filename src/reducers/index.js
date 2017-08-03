import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './user'

const rootReducer = combineReducers({
	auth,
	routing: routerReducer
})

export default rootReducer