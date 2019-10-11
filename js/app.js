const express = require('express');
const expHbs = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'static')));

app.engine('.hbs', expHbs({
    extname: '.hbs', defaultLayout: null
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

let { user, house } = require('./controllers');
let { user: middlewareUser, house: middlewareHouse } = require('./mw');

app.get('/', (req, res) =>{
    res.render('index');
});

//users

app.get('/register', (req, res) =>{
    res.render('register');
});

app.post('/register',middlewareUser.checkUserValidityMiddleWare, user.createUser);

app.get('/login', (req, res) =>{
    res.render('login');
});

app.post('/login', middlewareUser.loginDataValidation, user.loginUser);

app.get('/users/:id', middlewareUser.isUserExist, user.getUser);

app.post('/users/:id', middlewareUser.checkUpdateUserValidityMiddleWare, middlewareUser.isUserExist, user.updateUser);

//houses

app.get('/houses', (req,res)=>{
    res.render('houseCreator');
});

app.post('/houseCreator', middlewareHouse.checkInputHouseDataValidity,house.createHouse);

app.get('/houses/:id', middlewareHouse.isHouseExist, house.getHouse);

app.post('/houses/:id', middlewareHouse.checkUpdateInputDataHouse, middlewareHouse.isHouseExist, house.updateHouse);

app.all("*", (req, res) => {
    res.render("not-found");
});

app.listen(3000, () => {
    console.log("Listen 3000");
});
