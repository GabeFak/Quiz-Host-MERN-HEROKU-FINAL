const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');

const User = require('../models/User');
const UserQuizData = require('../models/UserQuizData');

// @route GET api/userData
// @desc Get all user data
// @access Private
router.get('/', auth, async(req, res) => {
    try {  
        let quizes = await UserQuizData.find({ user: req.user.id }).sort({ date: -1});
        res.json(quizes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/userData
// @desc Add new user data
// @access Private
router.post('/', auth, [
    check('quizName', "Quiz title required").not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { quizName, quizQuestions, isPublished } = req.body;
        const name = await User.findById(req.user.id);
        // console.log(name.name);
        try {
            const newQuiz = new UserQuizData({
                quizName,
                quizQuestions,
                userName: name.name,
                isPublished,
                // views,
                // date,
                user: req.user.id
            });

            const quiz = await newQuiz.save();

            res.json(quiz);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        };
});

// @route PUT api/userData/:id
// @desc Update user data
// @access Private
router.put('/:id', auth, async(req, res) => {
    const { quizName, quizQuestions, isPublished } = req.body;

    //build quiz object
    const quizFeilds = {};
    if(quizName) quizFeilds.quizName = quizName;
    if(quizQuestions) quizFeilds.quizQuestions = quizQuestions;
    if(isPublished) quizFeilds.isPublished = isPublished;

    try {
        let quiz = await UserQuizData.findById(req.params.id);

        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized"});
        };

        quiz = await UserQuizData.findByIdAndUpdate(req.params.id,  
        {
            $set: quizFeilds
        },
        {
            new: true
        });

        res.json(quiz);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    };
});

// @route DELETE api/userData/:id
// @desc Delete user data
// @access Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let quiz = await UserQuizData.findById(req.params.id);

        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized"});
        };

        await UserQuizData.findByIdAndRemove(req.params.id);     

        res.json({ msg: "Quiz Removed "});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    };
});

module.exports = router;