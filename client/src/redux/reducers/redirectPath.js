const redirectPathReducer = (state = null, action) => {
  switch (action.type) {
    case 'REDIRECT_PATH_SET':
      return action.payload;
    default:
      return state
  }
}

export default redirectPathReducer;