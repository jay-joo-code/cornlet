const chatroomRouter = require('express').Router();
const Chatroom = require('../models/Chatroom');
const User = require('../models/User');

// const logChats = async () => {
//   const chatrooms = await Chatroom.find();
//   const chatroomsCount = chatrooms.length;

//   let msgsCount = 0;
//   chatrooms.forEach((chatroom) => {
//     msgsCount += chatroom.msgs.length;
//   });
// };

chatroomRouter.post('/create', async (req, res) => {
  try {
    const {
      lid, msgContent, searcherUid, ownerUid,
    } = req.body;
    const firstMsg = {
      content: msgContent,
      uid: searcherUid,
    };
    const searcher = await User.findOne({ uid: searcherUid });
    const chatroomData = {
      uids: [searcherUid, ownerUid],
      notifUids: [searcherUid, ownerUid],
      searcher: searcher._id,
      listing: lid,
      msgs: [firstMsg],
    };
    const newChatroom = await new Chatroom(chatroomData).save();
    const populatedChatroom = await newChatroom.populate('searcher listing').execPopulate();
    res.send(populatedChatroom);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

chatroomRouter.get('/user/:uid', async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ uids: req.params.uid }).populate('searcher listing').sort({ updatedAt: -1 });
    res.send(chatrooms);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

chatroomRouter.get('/listing/searchers/:lid', async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ listing: req.params.lid });
    const searcherPromises = chatrooms.map(async (chatroom) => {
      const searcher = await User.findById(chatroom.searcher);
      return searcher;
    });
    const searchers = await Promise.all(searcherPromises);
    res.send(searchers);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

chatroomRouter.get('/:uid/:lid', async (req, res) => {
  try {
    const chatroom = await Chatroom.findOne({ uids: req.params.uid, listing: req.params.lid });
    res.send(chatroom);
  }
  catch (e) {
    res.status(500).send(e);
  }
});


module.exports = chatroomRouter;
