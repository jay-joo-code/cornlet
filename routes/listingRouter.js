const listingRouter = require('express').Router();
const moment = require('moment');
const Listing = require('./../models/Listing');

listingRouter.post('/create', async (req, res) => {
  try {
    const result = await new Listing(req.body).save();
    res.send(result);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

listingRouter.get('/', async (req, res) => {
  try {
    const today = new Date();

    // format query
    const {
      uid, active, start, end, sort, minPrice, maxPrice, minToCampus, maxToCampus, page,
    } = req.query;
    const deletedQuery = { deleted: false };
    const activeQuery = active ? { active } : {};
    const uidQuery = uid ? { 'user.uid': uid } : {};
    const startQuery = start && !end
      ? { start: { $lte: moment(new Date(start)).endOf('day').toDate() }, end: { $gt: new Date(start) } }
      : {};
    const endQuery = end && !start
      ? { end: { $gte: new Date(end) }, start: { $lt: new Date(end) } }
      : uid
        ? {}
        : { end: { $gte: today.setDate(today.getDate() - 1) } };
    const startEndQuery = start && end
      ? { start: { $lte: moment(new Date(start)).endOf('day').toDate() }, end: { $gte: new Date(end) } }
      : {};
    const priceQuery = minPrice && maxPrice
      ? { price: { $lte: Number(maxPrice), $gte: Number(minPrice) } }
      : {};
    const toCampusQuery = minToCampus && maxToCampus
      ? { toCampus: { $lte: Number(maxToCampus), $gte: Number(minToCampus) } }
      : {};
    const query = {
      ...deletedQuery,
      ...activeQuery,
      ...uidQuery,
      ...startQuery,
      ...endQuery,
      ...startEndQuery,
      ...priceQuery,
      ...toCampusQuery,
    };

    // sort
    const sortTypeToQuery = {
      recent: { sort: { updatedAt: -1 } },
      'price-asc': { sort: { price: 1 } },
      'price-dec': { sort: { price: -1 } },
      'to-campus': { sort: { toCampus: 1 } },
    };
    const sortQuery = sortTypeToQuery[sort] || { sort: { updatedAt: -1 } };
    const options = {
      page: page || 1,
      limit: 16,
      sort: sortQuery.sort,
    };
    const docs = await Listing.paginate(query, options);
    res.send(docs);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

listingRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Listing.findById(req.params.id);
    res.send(doc.toObject({ virtuals: true }));
  }
  catch (e) {
    res.status(500).send(e);
  }
});

listingRouter.put('/:id/update', async (req, res) => {
  try {
    const data = {
      ...req.body,
      updatedAt: new Date(),
    };
    const doc = await Listing.findByIdAndUpdate(req.params.id, data, { new: true });
    res.send(doc);
  }
  catch (e) {
    res.status(500).send(e);
  }
});

module.exports = listingRouter;
