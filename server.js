const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    let now = new Date().toString();
    let message = `${now}: ${req.method} ${req.url}`;
    
    console.log(`${now}: ${req.method} ${req.url}`);
    
    fs.appendFile('server.log', message + "\n", (err) => {
        if ( err ) {
            console.log(err);
        }
    });
    
    next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    
    // res.send({
    //     main: 'Version Guy Gavergun',
    //     likes: ['coool', 'school', 'cities']
    // });

    res.render('home.hbs', {
        title: 'Home Page Titleeee',
        welcome: 'Hello Welcome to Our Website'
    })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       title: 'About Page Titleeee',
   });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});