const socketio = require("socket.io");
const Chatroom = require("./models/Chatroom");
const User = require("./models/User");
const sendMsgNotifEmail = require("./util/sendMsgNotifEmail");

module.exports.listen = (app) => {
  const io = socketio.listen(app);

  io.on("connection", (socket) => {
    socket.on("msg", async (data) => {
      try {
        io.emit("msg", data);

        // fetch chatroom
        const chatroom = await Chatroom.findById(data.cid).populate(
          "searcher listing"
        );

        // set other user to unread
        const otherUserUid = chatroom.uids.filter((uid) => uid !== data.uid)[0];
        const updatedNotifUids = [...chatroom.notifUids];
        if (!chatroom.notifUids.includes(otherUserUid)) {
          updatedNotifUids.push(otherUserUid);
        }

        // remove cid from new msg
        const newMsg = {
          ...data,
          cid: undefined,
        };

        // update DB
        const updateData = {
          notifUids: updatedNotifUids,
          $push: { msgs: newMsg },
        };
        await Chatroom.findByIdAndUpdate(data.cid, updateData, { new: true });

        // send email notif to other user
        const isSearcher = otherUserUid === chatroom.searcher.uid;
        const targetEmail = isSearcher
          ? chatroom.searcher.email
          : chatroom.listing.user.email;
        const firstName = isSearcher
          ? chatroom.listing.user.name.split(" ")[0]
          : chatroom.searcher.name.split(" ")[0];

        /* removed because it's handling an impossible case:
          listing owner hasn't created an account yet
          */
        // if (!isSearcher) {
        //   console.log("email recipient is listing owner");
        //   // if listing owner hasn't created an account yet, don't send email alert
        //   console.log("otherUserUid", otherUserUid);
        //   const user = await User.findOne({ uid: otherUserUid });
        //   if (!user) {
        //     console.log("prevent send email notif");
        //     return;
        //   }
        // }

        sendMsgNotifEmail(targetEmail, firstName, data.content);
      } catch (e) {
        console.log("ERROR: socket > msg", e);
      }
    });

    socket.on("new chatroom", async (chatroom) => {
      try {
        io.emit("new chatroom", chatroom);

        // chatroom can only be created by searcher
        // send email notif to listing owner
        const { name } = chatroom.searcher;
        const firstName = name.split(" ")[0];
        const { email } = chatroom.listing.user;

        const user = await User.findOne({ email });
        if (user && chatroom.listing.user.uid === user.uid) {
          console.log("passed uid validation");
          sendMsgNotifEmail(email, firstName, chatroom.msgs[0].content);
        } else {
          console.log("failed uid validation");
        }
      } catch (e) {
        console.log("ERROR: socket > new chatroom", e);
      }
    });

    socket.on("chatroom seen", async (data) => {
      try {
        io.emit("chatroom seen", data);

        // save to DB
        const chatroom = await Chatroom.findById(data.cid);
        const newNotifUids = [...chatroom.notifUids];
        if (newNotifUids.includes(data.uid)) {
          newNotifUids.splice(newNotifUids.indexOf(data.uid), 1);
        }
        chatroom.notifUids = newNotifUids;
        await chatroom.save();
      } catch (e) {
        console.log("ERROR: socket > chatroom seen", e);
      }
    });

    socket.on("disconnect", () => {
      // handle disconnect
    });
  });

  return io;
};
