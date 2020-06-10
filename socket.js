const socketio = require('socket.io');
const Chatroom = require('./models/Chatroom');

module.exports.listen = function(app){
    io = socketio.listen(app)

    io.on('connection', (socket) => {
			const { id } = socket.client;
		
			socket.on('msg', async (data) => {
				try {
					io.emit('msg', data);
			
					// save to DB
					const chatroom = await Chatroom.findById(data.cid);
					const newMsgs = [...chatroom.msgs];

					// set other user to unread
					const otherUserUid = chatroom.uids.filter((uid) => uid !== data.uid)[0];
					if (!chatroom.notifUids.includes(otherUserUid)) {
						chatroom.notifUids.push(otherUserUid);
					}

					// add msg to chatroom
					delete data.cid;
					newMsgs.push(data);
					chatroom.msgs = newMsgs;

					chatroom.save();
				}
				catch (e) {
					console.log('socket error', e);
				}
			})

			socket.on('new chatroom', async (data) => {
				try {
					io.emit('new chatroom', data);
				}
				catch (e) {
					console.log('socket error', e);
				}
			})

			socket.on('chatroom seen', async (data) => {
				try {
					io.emit('chatroom seen', data);

					// save to DB
					const chatroom = await Chatroom.findById(data.cid);
					const newNotifUids = [...chatroom.notifUids];
					if (newNotifUids.includes(data.uid)) {
						newNotifUids.splice(newNotifUids.indexOf(data.uid), 1);
					}
					chatroom.notifUids = newNotifUids;
					chatroom.save();
				}
				catch (e) {
					console.log('socket error', e);
				}
			})
		
			socket.on('disconnect', (data) => {
				// handle disconnect
			});
		});

    return io
}