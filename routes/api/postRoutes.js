const router = require('express').Router();
const { Post } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({})
        .then((postData) => res.json(postData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', auth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content
    })
    .then((postData) => res.json(postData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;