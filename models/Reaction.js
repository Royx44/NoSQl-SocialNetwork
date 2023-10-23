const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => dateFormat(createdAt) // You can use Mongoose's 'toJSON' option for this purpose.
    }
});

// Consider using the 'toJSON' option to automatically format createdAt in ISO string.
reactionSchema.set('toJSON', { getters: true });

// Helper function to format 'createdAt' as an ISO string.
function dateFormat(createdAt) {
    return createdAt.toISOString();
}

module.exports = reactionSchema;
