const http = require('http');
const path = require('path');

const express = require('express');
const rootDir = require('./util/path');
const bodyParser = require('body-parser');
const handleBars = require('express-handlebars');

const app = express();

app.locals.basedir = path.join(__dirname, 'views');

app.engine('hbs', handleBars());
app.set('view engine', 'hbs');
app.set('views', 'views')

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: '404'});
});

const server = http.createServer(app);

server.listen(3000);