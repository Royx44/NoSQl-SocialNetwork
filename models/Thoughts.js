const { Schema, model } = require('mongoose');

// Import the 'Reaction' schema. Assuming 'reactionSchema' is correctly defined in 'Reaction.js'.
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => dateFormat(createdAt) // You can use Mongoose's 'toJSON' option for this purpose.
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema] // Assuming 'reactionSchema' is properly defined.
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});



// Helper function to format 'createdAt' as an ISO string.
function dateFormat(createdAt) {
    return createdAt.toISOString();
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
