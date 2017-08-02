import {
	REQUEST_USER,
	RECEIVE_USER
} from 'ACTION/user'

/**
 * login
 * @param  {Object} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function auth(state = {}, action) {
	switch(action.type) {
		case REQUEST_USER:
		case RECEIVE_USER:
			return {
				...state,
				user: post(state[action.user], action)
			}
		default:
			return state
	}
}

const post = (state = { isFetching: false, user: {} }, action) => {
	switch(action.type) {
		case REQUEST_USER:
			return { ...state, isFetching: true }
		case RECEIVE_USER:
			return {
				...state,
				isFetching: false,
				user: action.user
			}
		default:
			return state
	}
}