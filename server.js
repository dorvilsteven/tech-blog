const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3005;

const handlebars = exphbs.create({helpers});

// save session
const newSession = {
    secret: "secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

// setup template engine
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(newSession));
// use routes 
app.use(routes);

// listen to port and sync database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});