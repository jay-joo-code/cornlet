const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const formatDate = require("../util/formatDate");

const { Schema } = mongoose;

const listingSchema = Schema({
  addr: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  toCampus: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "",
  },
  totalRooms: {
    type: Number,
    required: true,
    default: 0,
  },
  availRooms: {
    type: Number,
    required: true,
    default: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    default: 0,
  },
  femaleRoommates: {
    type: Number,
    required: true,
    default: 0,
  },
  maleRoommates: {
    type: Number,
    required: true,
    default: 0,
  },
  amenities: {
    type: [String],
    default: [],
  },
  imgs: {
    type: [String],
    default: [],
  },
  thumbnailIdx: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  user: {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  displayEmail: String,
  displayName: String,
  active: {
    type: Boolean,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  cornellOnly: {
    type: Boolean,
    required: true,
    default: false,
  },
  bmed: {
    // uid of users who bookmarked this listing
    // add only
    type: [String],
    required: true,
    default: [],
  },
  term: String,
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  views: {
    type: Number,
    default: 0,
  },
});

listingSchema
  .virtual("dateString")
  .get(() => `${formatDate(this.start)} ~ ${formatDate(this.end)}`);

listingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Listing", listingSchema);
