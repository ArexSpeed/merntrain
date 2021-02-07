import * as api from '../api'

//Action creators -> redux thunk allow as make async action and dispatch(action) instead return
export const getPosts = () => async (dispatch) => {

  const action = {type: 'FETCH_ALL', payload: []}

  dispatch(action)
}