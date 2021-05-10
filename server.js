const express = require ('express');
const lodash = require('lodash');
const ejs = require('ejs');

const date = require(__dirname + '/date.js');

const app = express();

const homeStartingContent = "Welcome to bikes galore. We are proud to say that we have the largest bike orientated user base in the world! We are really kicking goals for this one. We all know we are and you should too";
const aboutStartingContent = "Welcome to bikes galore. We are proud to say that we have the largest bike orientated user base in the world! We are really kicking goals for this one. We all know we are and you should too";
const contactStartingContent = "Please contact us on (03) 9283 8272";

// Storage of posts composed
let posts = [];


app.set('view engine', 'ejs');

app.use(express.urlencoded( {extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { 
        homeStartingContent: homeStartingContent,
        posts: posts
    });
})

app.get('/about', (req, res) => {
    res.render('about', { aboutStartingContent: aboutStartingContent });
})

app.get('/contact', (req, res) => {
    res.render('contact', { contactStartingContent: contactStartingContent });
})

app.get('/compose', (req, res) => {
    res.render('compose');
})

app.post('/compose', (req, res) => {

    const reqContent = {
        postHeading: req.body.postTitle,
        postContent: req.body.postContent,
        postEndpoint: lodash.kebabCase(req.body.postTitle),
        postDate: date.getDate()
    };

    posts.push(reqContent);
    
    res.redirect('/');
})

app.get('/posts/:postTitle', (req, res) => {
    const urlEndpoint = lodash.kebabCase(req.params.postTitle);
    
    posts.forEach( post => {
        if (urlEndpoint === post.postEndpoint) {
            res.render('post', { post: post });
        }
    })
})

app.listen(3000, () => console.log('Server running on port 3000'));

