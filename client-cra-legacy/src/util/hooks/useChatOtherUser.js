import { useSelector } from "react-redux";

function useChatOtherUser(chatroom) {
  const signedInUser = useSelector((state) => state.user);
  if (!chatroom.searcher) {
    return chatroom.listing.user;
  }
  if (chatroom.searcher.uid !== signedInUser.uid) {
    return chatroom.searcher;
  }
  else {
    return chatroom.listing.user;
  }
}

export default useChatOtherUser;