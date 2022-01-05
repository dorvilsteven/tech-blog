const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'password',]
    })
    .then((userData) => res.json(userData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include:[
            {
                model: Post,
                attributes:['id', 'title','text', 'user_id']
            },
            {
                model: Comment,
                attributes:['id','comment_text','user_id','post_id']
            }
        ]
    })
    .then((userData) => {
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); 
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((userData) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); 
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then((userData) => {
        const validPassword = dbUserData.checkPassword(req.body.password)
        if (!userData || !validPassword) {
            res.status(400).json({ message: 'credentials are incorrect (either username, or password, or both), please try again.'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            // req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: `Welcome ${userData.username}.`});
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); 
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;