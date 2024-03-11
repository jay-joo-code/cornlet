const chatroomsReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHATROOMS_SET': {
      return action.payload;
    }

    case 'CHATROOMS_ADD': {
      if (state.includes(action.payload)) {
        return state;
      }
      else {
        return [action.payload, ...state];
      }
    }

    case 'CHATROOMS_REMOVE': {
      return state.filter((chatroom) => chatroom._id !== action.payload._id);
    }
    
    case 'CHATROOMS_MSG': {
      const { cid } = action.payload;
      const cids = state.map((chatroom) => chatroom._id);
      const idx = cids.indexOf(cid);

      if (idx >= 0) {
        // new chat occured in user's chatroom
        const newState = [...state];
        const [chatroom] = newState.splice(idx, 1);

        // set other user to unread
        const otherUserUid = chatroom.uids.filter((uid) => uid !== action.payload.uid)[0];
        if (!chatroom.notifUids.includes(otherUserUid)) {
          chatroom.notifUids.push(otherUserUid);
        }

        // add msg to chatroom
        delete action.payload.cid;
        chatroom.msgs.push(action.payload);
        newState.unshift(chatroom);

        return newState;
      }
      else {
        return state;
      }
    }
    
    case 'CHATROOMS_SEEN': {
      const { cid, uid } = action.payload;
      const targetChatrooms = state.filter((chatroom) => chatroom._id === cid);
      if (targetChatrooms.length === 1) {
        const chatroom = targetChatrooms[0];
        if (chatroom.notifUids.includes(uid)) {
          chatroom.notifUids.splice(chatroom.notifUids.indexOf(uid), 1);
        }
        const newState = state.filter((chatroom) => chatroom._id !== cid);
        newState.unshift(chatroom);
        return newState;
      }
      else {
        return state;
      }
    }

    default:
      return state
  }
}

export default chatroomsReducer;