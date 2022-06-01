const authRouter = require("express").Router();
const passportGoogle = require("../auth/google");
const Chatroom = require("../models/Chatroom");

authRouter.get(
  "/google",
  passportGoogle.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

authRouter.get(
  "/google/callback",
  passportGoogle.authenticate("google", {
    successRedirect: `${process.env.REACT_APP_CLIENT_DOMAIN}/auth/callback`,
    failureRedirect: `${process.env.REACT_APP_CLIENT_DOMAIN}/auth/callback`,
  })
);

authRouter.get("/callback", async (req, res) => {
  try {
    if (req.user) {
      const chatrooms = await Chatroom.find({ uids: req.user.uid })
        .populate("searcher listing")
        .sort({ updatedAt: -1 });
      res.send({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies,
        chatrooms,
      });
    } else {
      res.send({
        success: false,
        message: "user was not authenticated",
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

authRouter.post("/signout", (req, res) => {
  req.logout();
  res.send("OK");
});

module.exports = authRouter;
