const tempValuesReducer = (state = null, action) => {
  switch (action.type) {
    case 'TEMP_VALUES_SET':
      return action.payload;
    
    case 'TEMP_VALUES_RESET':
      return null;

    default:
      return state
  }
}

export default tempValuesReducer;