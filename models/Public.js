const mongoose = require('mongoose');

const PublicDataSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String,
        require: true
    },
    quizName: {
        type: String,
        required: true
    },
    quizQuestions: {
        type: Array,
        require: true
    },
    isPublished: {
        type: String,
        default: 'Published'
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: String
    },
    postId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Public', PublicDataSchema);