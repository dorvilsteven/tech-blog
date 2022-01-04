const router = require('express').Router();
const { Post, User, Comment } = require('../../models');


router.get('/', (req,res)=>{
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: [
            {
                model:User,
                attributes:['username'],
            },
            {
                model:Post,
                attributes: ['id', 'title', 'text']
            }
        ]
    })
    .then(commentData => res.json(commentData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Comment.findOne({
        where: {
            id: req.params.id
        },

        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: [
            {
                model: User,
                attributes:['username'],
            },
            {
                model: Post,
                attributes: ['id', 'title', 'text']
            }
        ]
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No Comment Found'});
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});


router.delete('/:id', (req,res)=>{
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.json(commentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports=router;