const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const Auth = require('../utils/Auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'text',
            'created_at',
            'user_id'
        ],
        include: [
            {
                model:User,
                attributes:['username']
            }
        ]
    }).then((postData) =>  {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => res.render('signup'));

router.get('/dashboard', Auth, (req,res) =>{
    Post.findAll({
        where: {
         user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title'   
        ]
    })
    .then((postData) =>{
        const title = postData.map(post => post.get({ plain: true }));
        res.render( 'dashboard', { title });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/dashboard/post/:id', Auth, (req,res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['title', 'text']
    })
    .then((postData) => {
        const updatedPost = postData.get({ plain: true });
        res.render('updatePost', { updatedPost });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/dashboard/new', Auth, (req,res) => res.render('addPost'));

router.get('/dashboard/post/:id', Auth, (req,res) =>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
          'id',
          'title',
          'text',
          'created_at'
        ],
        include: [
            {
              model:User,
              attributes:['username']
            },
            {
                model:Comment,
                attributes:['comment_text', 'created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(postData =>{
        if(!postData){
            res.status(404).json({ message:'No Post Found!'});
            return;
        }
        const info = postData.get({ plain: true});
        res.render('post', { info, loggedIn: req.session.loggedIn });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
    
});

module.exports = router;