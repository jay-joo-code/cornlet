const Chatroom = require('../models/Chatroom');
const User = require('../models/User');
const Listing = require('../models/Listing');

// emails of users who are in a chatroom
const getUserEmailsInChatroom = async () => {
  try {
    const chatrooms = await Chatroom.find();
    const uids = chatrooms.reduce((accum, current) => {
      const month = new Date(current.updatedAt).getMonth();
      const year = new Date(current.updatedAt).getFullYear();
      if (month !== 4 || year !== 2021) {
        return accum;
      }

      const uidsToAdd = [];
      current.uids.forEach((uid) => {
        if (!accum.includes(uid)) {
          uidsToAdd.push(uid);
        }
      });
      return [...accum, ...uidsToAdd];
    }, []);
    const emails = [];
    const promises = uids.map(async (uid) => {
      const user = await User.findOne({ uid });
      if (user && user.email) {
        emails.push(user.email);
      }
    });
    await Promise.all(promises);
    return emails;
  }
  catch (error) {
    return error;
  }
};

const getUsersAnalysis = async () => {
  try {
    const users = await User.find();

    return ({ totalUserCount: users.length });
  }
  catch (error) {
    return error;
  }
};

const getListingsAnalysis = async () => {
  try {
    const listings = await Listing.find();
    const totalListingsCount = listings.length;
    let activeListingsCount = 0;
    let deletedListingsCount = 0;
    let inactiveListingsCount = 0;
    let totalPrice = 0;
    listings.forEach((listing) => {
      totalPrice += listing.price;
      if (listing.deleted) {
        deletedListingsCount += 1;
      }
      else if (listing.active) {
        activeListingsCount += 1;
      }
      else {
        inactiveListingsCount += 1;
      }
    });
    const avgListingPrice = totalPrice / totalListingsCount;
    return {
      totalListingsCount,
      activeListingsCount,
      inactiveListingsCount,
      deletedListingsCount,
      avgListingPrice,
    };
  }
  catch (error) {
    return error;
  }
};

const getChatroomAnalysis = async () => {
  try {
    const chatrooms = await Chatroom.find();
    const chatroomCount = chatrooms.length;
    let msgCount = 0;
    chatrooms.forEach((chatroom) => {
      msgCount += chatroom.msgs.length;
    });
    return {
      chatroomCount,
      msgCount,
    };
  }
  catch (error) {
    return error;
  }
};

const downloadArray = (arr) => {
  let csvContent = 'data:text/csv;charset=utf-8,';

  arr.forEach((str) => {
    csvContent += `${str}\r\n`;
  });
  const encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
};

module.exports = {
  downloadArray,
  getUserEmailsInChatroom,
  getUsersAnalysis,
  getListingsAnalysis,
  getChatroomAnalysis,
};
