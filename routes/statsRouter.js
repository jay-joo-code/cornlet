const statsRouter = require('express').Router();
const { getListingsAnalysis, getChatroomAnalysis, getUsersAnalysis } = require('../util/stats');

statsRouter.get('/', async (req, res) => {
  try {
    const listingAnalysis = await getListingsAnalysis();
    const chatroomAnanlysis = await getChatroomAnalysis();
    const usersAnalysis = await getUsersAnalysis();

    res.send({
      ...listingAnalysis,
      ...chatroomAnanlysis,
      ...usersAnalysis,
    });
  }
  catch (e) {
    res.status(500).send(e);
  }
});

module.exports = statsRouter;
