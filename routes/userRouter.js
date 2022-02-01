const userRouter = require("express").Router();
const Chatroom = require("../models/Chatroom");
const Listing = require("../models/Listing");
const User = require("../models/User");

const logUsers = async () => {
  const chatrooms = await Chatroom.find();
  const uids = chatrooms.reduce((accum, current) => {
    const uidsToAdd = [];
    current.uids.forEach((uid) => {
      if (!accum.includes(uid)) {
        uidsToAdd.push(uid);
      }
    });
    return [...accum, ...uidsToAdd];
  }, []);
  const promises = uids.map(async (uid) => {
    const user = await User.findOne({ uid });
    return user && user.email;
  });
  const emails = await Promise.all(promises);
};

logUsers();

userRouter.post("/save", async (req, res) => {
  try {
    const { uid, displayName: name, photoURL, email } = req.body;
    const data = {
      uid,
      name,
      photo: photoURL,
      email,
    };
    const user = await User.findOne({ uid });
    if (!user) {
      // create new user
      await new User(data).save();
    } else {
      // update user data
      user.uid = uid;
      user.name = name;
      user.photo = photoURL;
      user.email = email;
      await user.save();
    }
    res.send(true);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.get("/:userId/listings", async (req, res) => {
  try {
    const listings = await Listing.find({ "user.uid": req.params.userId }).sort(
      { createdAt: -1 }
    );
    res.send(listings);
  } catch (e) {
    res.status(500).send(e);
  }
});

// get uid's bookmark data
userRouter.get("/:id/bm", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ id }).populate("bm.listings");

    if (user) {
      res.send(user.bm);
    } else {
      throw new Error("Invalid uid");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.put("/:id/bm/notif/false", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { "bm.notif": false },
      { new: true }
    );
    res.send(updatedUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

// add or remove lid to uid's bookmarked listings
// opr: add || remove
userRouter.put("/:id/bm/:opr/:lid", async (req, res) => {
  try {
    const { id, lid, opr } = req.params;
    const user = await User.findById(id);

    if (user) {
      if (opr === "add") {
        if (user && !user.bm.listings.includes(lid)) {
          user.bm.listings = [...user.bm.listings, lid];
          user.bm.notif = true;
        }
      } else if (opr === "remove") {
        if (user && user.bm.listings.includes(lid)) {
          user.bm.listings = [...user.bm.listings].filter(
            (bmLid) => bmLid.toString() !== lid
          );
        }
      }
      await user.save({ new: true });
    }
    res.send("OK");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = userRouter;
