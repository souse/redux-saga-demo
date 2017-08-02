export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const requestUser = user => {
	return {
		type: REQUEST_USER,
		user
	}
}

export const receiveUser = user => {
	return {
		type: RECEIVE_USER,
		user
	}
}