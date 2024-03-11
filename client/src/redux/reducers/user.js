const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_SET':
      return action.payload

    case 'USER_SET_PROP':
      return {
        ...state,
        ...action.payload,
      }

    case 'USER_BM_ADD':
      if (!state) return state

      const matches = state.bm.listings.filter((listing) => listing._id === action.payload._id)
      if (matches.length > 0) {
        // listing already in bm
        return state
      } else {
        // add listing to bm
        return {
          ...state,
          bm: {
            ...state.bm,
            notif: true,
            listings: [...state.bm.listings, action.payload],
          },
        }
      }

    case 'USER_BM_REMOVE':
      if (!state) return state

      const newBmListings = state.bm.listings.filter(
        (listing) => listing._id !== action.payload._id
      )
      return {
        ...state,
        bm: {
          ...state.bm,
          listings: newBmListings,
        },
      }

    case 'USER_BM_NOTIF_FALSE':
      if (!state) return state

      return {
        ...state,
        bm: {
          ...state.bm,
          notif: false,
        },
      }

    case 'USER_BAN':
      if (!state) return state

      return {
        ...state,
        isBanned: true,
      }

    default:
      return state
  }
}

export default userReducer
