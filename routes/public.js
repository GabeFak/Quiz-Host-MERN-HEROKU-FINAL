const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const Public = require('../models/Public');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route  GET api/public
// @desc   Get all public quizes regardless of user or if logged in 
// @access Public
router.get('/', async(req, res) => { 
    try {
        const search = await Public.find({isPublished: "Published"}).select('-user');
        res.json(search);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    };
});

router.patch('/:id', async(req, res) => {
    try {
        let quiz = await Public.find({postId: req.params.id});
        let newViews = quiz[0].views + 1;
        quiz = await Public.findByIdAndUpdate(quiz[0]._id,  
            {
                views: newViews
            });
        res.json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    };
});

router.post('/', auth, [
    check('quizName', "Quiz title required").not().isEmpty(),
    check('quizQuestions', "Quiz quiestions required").not().isEmpty()
    // check('isPublished', "Quiz is already published").equals('Unpublished')
], async(req, res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { quizName, quizQuestions, isPublished, postId } = req.body;
        const name = await User.findById(req.user.id);
 
        try {
            const newPublicQuiz = new Public({
                quizName,
                quizQuestions,
                userName: name.name,
                isPublished,
                postId,
                // views,
                // date,
                user: req.user.id
            });

            const publicQuiz = await newPublicQuiz.save();

        res.json(publicQuiz);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        };
});

router.put('/:id', auth, async(req, res) => { 
    const { quizName, quizQuestions, isPublished } = req.body;

    //build quiz object
    const quizFeilds = {};
    if(quizName) quizFeilds.quizName = quizName;
    if(quizQuestions) quizFeilds.quizQuestions = quizQuestions;
    if(isPublished) quizFeilds.isPublished = isPublished;

    try {

        let quiz = await Public.find({postId: req.params.id});
        

        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz[0].user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not Authorized"});
        };

        quiz = await Public.findByIdAndUpdate(quiz[0]._id,  
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

router.delete('/:id', auth, async(req, res) => {
    try {
        let quiz = await Public.find({postId: req.params.id});
        if(!quiz) return res.status(404).json({ msg: "Quiz not found"});

        //Make sure user owns quiz
        if(quiz[0].user.toString() !== req.user.id) {
            
            return res.status(401).json({ msg: "Not Authorized"});
        };

        await Public.findByIdAndRemove(quiz[0]._id);     

        res.json({ msg: "Quiz Removed "});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    };
});

module.exports = router;