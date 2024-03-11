import React from 'react';
import socket from 'src/util/socket';
import { useDispatch, useSelector } from 'react-redux';

const SocketIO = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  socket.on('msg', (data) => {
    dispatch({
      type: 'CHATROOMS_MSG',
      payload: data,
    });
  });

  socket.on('new chatroom', (chatroom) => {
    if (user && chatroom.uids.includes(user.uid)) {
      dispatch({
        type: 'CHATROOMS_ADD',
        payload: chatroom,
      });
    }
  });

  socket.on('chatroom seen', ({ cid, uid }) => {
    dispatch({
      type: 'CHATROOMS_SEEN',
      payload: { cid, uid },
    });
  });

  return <div />;
};

export default SocketIO;
