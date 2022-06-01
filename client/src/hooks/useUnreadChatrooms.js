import React from 'react';
import { useSelector } from 'react-redux';

const useUnreadChatrooms = () => {
	const chatrooms = useSelector((state) => state.chatrooms);
	const user = useSelector(state => state.user);
	if (!user) return [];
	return chatrooms.filter((chatroom) => chatroom.notifUids.includes(user.uid));
}

export default useUnreadChatrooms;