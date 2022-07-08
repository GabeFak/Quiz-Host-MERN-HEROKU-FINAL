const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs/dist/bcrypt');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');

const User = require('../models/User');
const PublicQuizes = require('../models/PublicQuizes');


// @route  GET api/quizes
// @desc   Get all public quizes owned by user
// @access Private
router.get('/', auth, async(req, res) => {  
    try {  
        const quizes = await PublicQuizes.find({ user: req.user.id }).sort({ date: -1});
        res.json(quizes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    };
});

// @route  POST api/quizes
// @desc   Post to public quizes database
// @access Private
router.post('/', auth, [
    check('quizName', "Quiz title required").not().isEmpty(),
    check('quizQuestions', "Quiz quiestions required").not().isEmpty()
    // check('isPublished', "Quiz is already published").equals('Unpublished')
], async(req, res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { quizName, quizQuestions, isPublished, _id} = req.body;
        const name = await User.findById(req.user.id);
        //userPostId gets generated in the front end and passed into the state. 
        try {
            const newPublicQuiz = new PublicQuizes({
                quizName,
                quizQuestions,
                userName: name.name,
                isPublished,
                postId: _id,
                // views,
                // date,
                user: req.user.id
            });

            newPublicQuiz.isPublished = "Published";

            const publicQuiz = await newPublicQuiz.save();

        res.json(publicQuiz);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        };
});

// @route  PUT api/quizes/:id
// @desc   Update public user quizes
// @access Private
router.put('/:id', auth, async(req, res) => { 
    const { quizName, quizQuestions, isPublished } = req.body;

    //build quiz object
    const quizFeilds = {};
    if(quizName) quizFeilds.quizName = quizName;
    if(quizQuestions) quizFeilds.quizQuestions = quizQuestions;
    if(isPublished) quizFeilds.isPublished = isPublished;

    try {
        let quiz = await PublicQuizes.findById(req.params.id);

        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized"});
        };

        quiz = await PublicQuizes.findByIdAndUpdate(req.params.id,  
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

// @route  DELETE api/quizes/:id
// @desc   Delete public user data
// @access Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let quiz = await PublicQuizes.findById(req.params.id);
        // console.log(quiz)
        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized"});
        };

        await PublicQuizes.findByIdAndRemove(req.params.id);     

        res.json({ msg: "Quiz Removed "});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    };
    // res.send('Deletes users public post');
});

module.exports = router;