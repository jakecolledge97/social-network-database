const { Schema, model } = require('mongoose');
const moment = require('moment')
const reactions = require('./Reaction')

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (formatDate) => moment(formatDate).format('dddd, MMMM Do YYYY hh:mm a')
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactions]
    }
);

thoughtsSchema
.virtual('reactionCount')
//Counts amount of reactions
.get(function() {
    return this.reactions.length
});

module.exports = Thoughts;