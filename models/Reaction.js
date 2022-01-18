const { Schema } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (formatDate) =>
        moment(formatDate).format("dddd, MMMM Do YYYY hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: true,
  }
);

