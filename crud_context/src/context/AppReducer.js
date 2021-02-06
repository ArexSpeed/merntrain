export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      }
      case 'ADD_USER':
        return {
          ...state,
          users: [action.payload, ...state.users]
        }
    default:
      return state
  }
}