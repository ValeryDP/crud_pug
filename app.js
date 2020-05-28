const express = require('express');
let courses = require('./data/courses.json');
const app = express();

app.set('view engine', 'pug');


app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function (req, res) {
    res.render('index',{title: 'CRUD Demo'});
});

app.get('/courses', function (req, res) {
    res.render('courses', {
        title: 'CRUD Курсы',
        courses: courses
    });
});

app.get('/courses/add', function (req, res) {
    res.render('add');
});

app.post('/courses/add', function (req, res) {
    let course = {
        id: Date.now(),
        name: req.body.name
    };
    courses.push(course);
    res.redirect('/courses');
});

app.get('/courses/edit/:d', function(req, res) {
    let course = courses.find(function (course) {
        return course.id === parseInt(req.params.id);
    });
    
    if (!course) {
        res.sendStatus(404);
        return;
    }

    res.render('edit', {course: course});
});

app.post('/courses/edit/:id', function(req, res) {
    let course = courses.find(function (course) {
        return course.id === parseInt(req.params.id);
    });

    if (!course) {
        res.sendStatus(404);
        return;
    }

    course.name = req.body.name;
    res.redirect('/courses');
});

app.get('/courses/delete/:id', function(req, res) {
    courses = courses.filter(function (course) {
        return course.id !== parseInt(req.params.id);
    });

    res.redirect('/courses');
});

app.listen(3000, function() {
    console.log('App at http://localhost:3000');
});