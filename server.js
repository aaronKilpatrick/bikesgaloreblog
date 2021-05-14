/*************************
 * Required
 *************************/
const express   = require ('express');
const _         = require('lodash');
const ejs       = require('ejs');
const mongoose  = require('mongoose');
const { eq } = require('lodash');
const date      = require(__dirname + '/date.js');

/*************************
 * Express Setup
 *************************/
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded( {extended: true }));
app.use(express.static('public'));

/*************************
 * Mongoose Setup
 *************************/
mongoose.connect('mongodb://localhost/bikesgalore', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
    postHeading:    String,
    postContent:    String,
    postEndpoint:   String,
    postDate:       String
};
const Post = mongoose.model('Post', postSchema);

/*************************
 * Starting Data
 *************************/
 const homeStartingContent       = "Welcome to bikes galore. We are proud to say that we have the largest bike orientated user base in the world! We are really kicking goals for this one. We all know we are and you should too";
 const aboutStartingContent      = "Welcome to bikes galore. We are proud to say that we have the largest bike orientated user base in the world! We are really kicking goals for this one. We all know we are and you should too";
 const contactStartingContent    = "Please contact us on (03) 9283 8272";


 /*************************
 * Root: Routing
 *************************/
app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if(!err) {
            res.render('home', { 
                homeStartingContent: homeStartingContent,
                posts: posts
            });
        } else {
            console.error('Error: ', err)
        }
    })
})

/*************************
 * About: Routing
 *************************/
app.get('/about', (req, res) => {
    res.render('about', { aboutStartingContent: aboutStartingContent });
})

/*************************
 * Contact: Routing
 *************************/
app.get('/contact', (req, res) => {
    res.render('contact', { contactStartingContent: contactStartingContent });
})

/*************************
 * Compose: Routing
 *************************/
app.get('/compose', (req, res) => {
    res.render('compose');
})

app.post('/compose', (req, res) => {

    const reqContent = new Post({
        postHeading: req.body.postTitle,
        postContent: req.body.postContent,
        postEndpoint: _.kebabCase(req.body.postTitle),
        postDate: date.getDate()
    });

    reqContent.save( (err)  => {
        if (err) return handleError(err);
        res.redirect('/');
    });
    
})

/*************************
 * Posts/*Post*: Routing
 *************************/
app.get('/posts/:postTitle', (req, res) => {
    const urlEndpoint = _.kebabCase(req.params.postTitle);
    
    Post.findOne({postEndpoint: urlEndpoint}, (err, post) => {
        if (err) return handleError(err); 
        if (!post) return res.render('404');

        res.render('post', {post: post})
    })
    // posts.forEach( post => {
    //     if (urlEndpoint === post.postEndpoint) {
    //         res.render('post', { post: post });
    //     }
    // })
})

/*************************
 * Express Listener
 *************************/
app.listen(3000, () => console.log('Server running on port 3000'));

