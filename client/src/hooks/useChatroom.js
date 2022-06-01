import React from 'react';
import { useSelector } from 'react-redux';

const useChatroom = (cid) => {
	const chatrooms = useSelector((state) => state.chatrooms);
	const target = chatrooms.filter((chatroom) => chatroom._id === cid);
	if (target.length === 0) return null;
	else return target[0]
}

export default useChatroom;