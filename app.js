const express = require('express');
const app = express();
const MainRouter = require('./router/router');
const PetRouter = require('./router/Mascotas');
const bodyParser = require('body-parser')
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();

//passport config
require('./config/passport')(passport);

//mongoose connection
const mongoose = require('mongoose');

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//morgan
app.use(morgan('dev'));
//coockieParser
app.use(cookieParser());
//session express
app.use(session({
    secret: 'nodeFundamentals',
    resave: false,
    saveUninitialized: false
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Database connection
const user = process.env.USER;
const password = process.env.PASSWORD;
const dbName = process.env.DBNAME;
//const uri = 'mongodb+srv://'+user+':'+password+'@cluster0.qozfm.mongodb.net/'+dbName+'?retryWrites=true&w=majority';
const uri = `mongodb+srv://${user}:${password}@cluster0.qozfm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, 
        {useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log('Conectado papu');
    })
    .catch( e => {
        console.log('Algo fallo, quien sabe donde');
        console.log(e);
    });
//const router = app.router();

//port
const port = process.env.PORT || 3000;

//templates ejs
//views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//router
app.use('/', MainRouter);
app.use('/mascotas', PetRouter);
//passport autenthication router
require('./router/passportRouter')(app, passport);


//usar directamente un recurso del folder
app.use(express.static(__dirname + "/public"));

//default error
app.use((req, res, next) => {
    res.status(404).render("404")
});



//exports.server = app;

app.listen(port? port: 3000, () => {
    console.log('Servidor haciendo la funcionacion en : ' + port);
});

