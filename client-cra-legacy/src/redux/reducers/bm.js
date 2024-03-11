const bmReducer = (state = { notif: false, listings: [] }, action) => {
  switch (action.type) {
    case 'BM_SET':
      return action.payload;

    case 'BM_ADD':
      if (!state.listings) {
        return {
          listings: [action.payload],
          notif: true,
        }
      }
      else {
        const newListings = [...state.listings];
        newListings.push(action.payload);
        return {
          ...state,
          listings: newListings,
          notif: true,
        }
      }

    case 'BM_REMOVE':
      if (!state.listings) {
        return state;
      }
      else {
        const newListings = state.listings.filter((listing) => listing._id !== action.payload._id);
        return {
          ...state,
          listings: newListings,
        }
      }
    
    case 'BM_NOTIF_TRUE':
      return {
        ...state,
        notif: true,
      }

    case 'BM_NOTIF_FALSE':
      return {
        ...state,
        notif: false,
      }
      
    default:
      return state
  }
}

export default bmReducer;