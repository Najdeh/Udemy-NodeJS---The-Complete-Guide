const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

const usersContainer = [];

app.post('/add-user', (req, res, next) => {
    usersContainer.push({ userName: req.body.userName });
    res.redirect('/');
});

app.get('/users', (req, res, next) => {
    res.render('add-user', { pageTitle: 'Users' });
})

app.get('/', (req, res, next) => {
    res.render('index', { usersContainer : usersContainer, pageTitle: 'Index' });
})

app.use('/555', (req, res, next) => {
    res.send('404');
});



app.listen(3000);