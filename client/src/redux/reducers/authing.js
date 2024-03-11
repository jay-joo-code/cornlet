const authingReducer = (state = false, action) => {
  switch (action.type) {
    case 'AUTHING_SET':
      return action.payload;
    default:
      return state
  }
}

export default authingReducer;