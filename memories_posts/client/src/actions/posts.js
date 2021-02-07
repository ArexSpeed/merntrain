import * as api from '../api'

//Action creators -> redux thunk allow as make async action and dispatch(action) instead return
export const getPosts = () => async (dispatch) => {
  try {
    const {data} = await api.fetchPosts()
    dispatch({type: 'FETCH_ALL', payload: []})
  } catch (error) {
    console.log(error.message)
  }

}