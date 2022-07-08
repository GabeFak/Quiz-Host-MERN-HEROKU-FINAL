const mongoose = require('mongoose');

const UserQuizDataSchema = mongoose.Schema({
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
        default: 'Unpublished'
    },
    views: {
        type: Number,
        default: 0
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model('UserQuizData', UserQuizDataSchema);
