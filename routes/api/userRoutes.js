const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
    .then((userData) => res.json(userData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        }
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
    })
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
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
            email: req.body.email
        }
    }).then((userData) => {
        const validPassword = dbUserData.checkPassword(req.body.password)
        if (!userData || !validPassword) {
            res.status(400).json({ message: 'credentials are incorrect (either username, or password, or both), please try again.'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: `Welcome ${userData.username}.`});
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err); 
    });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
      if (!userData[0]) {
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

module.exports = router;