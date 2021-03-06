var router = require("express").Router();
var db = require("../models");
const axios = require('axios');
var passport = require("../config/passport");
// var Sequelize = require("sequelize");
console.log(db.Book);
// homepage (login/signup)
router.get("/", function (req, res) {
    //render homepage
    res.render("index");
})

router.get("/api/login", function (req, res) {
    if (req.user) {
        res.redirect("/booksearch");
    }
    res.render("search");
})

//post request for new user signup
router.post("/api/signup", function (req, res) {
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.status(401).json(err);
    })

})

//post request for login of old user
router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
})

// Route for logging user out
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


//get request for search page when user signs up/logs in
router.get("/booksearch", function (req, res) {
    if (req.user) {
        res.render("search")
    } else {
        res.redirect('/')
    }
})

// post request when user inputs search credentials
router.get("/api/search/:title", function (req, res) {
    var title = req.params.title;
    var nameArray = title.split(" ");
    var newBookName = nameArray.join("+");
    newBook(newBookName, function (bookData) {
        // console.log(bookData);
        res.json(bookData)
    });

})

router.post("/api/booksearch/title", function (req, res) {
    var title = req.body.title;
    var nameArray = title.split(" ");
    var newBookName = nameArray.join("+");
    newBook(newBookName, function (bookData) {
        res.json(bookData)
    });
})

function newBook(newBookName, cb) {
    console.log("addffsf");

    var bookArray = [];
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + newBookName;
    axios.get(queryURL)
        .then(function (response) {
            var apiData = response.data;
            for (var i = 0; i < 6; i++) {
                bookArray.push(apiData.items[i])
            }
            cb(bookArray)
        })

}

//get request for search results from Books API
// router.get("/api/results", function (req, res) {
//     res.render("")
// })

//request for adding a book to Booklist table
router.post("/api/book", function (req, res) {
    if (req.user) {
        console.log(req.user);
        db.Book.create({
            title: req.body.title,
            author: req.body.author,
            UserId: req.user.id
        }).then(function (data) {
            res.json({
                id: data.insertID
            });
        }
        )
    } else {
        res.status(401).end("Unauthorized Request");
    }
})

//request for adding a book to have_read table
router.post("/api/completed", function (req, res) {
    if (req.user) {
        console.log(req.user);
        db.Book.create({
            title: req.body.title,
            author: req.body.author,
            have_read: req.body.have_read,
            UserId: req.user.id
        }).then(function (data) {
            res.json({
                id: data.insertID
            });
        }
        )
    } else {
        res.status(401).end("Unauthorized Request");
    }
})

//update request for moving Booklist book to completed books
router.post("/api/book/:id", function (req, res) {
    console.log(req.body.have_read, req.params.id);
    db.Book.update({
        have_read: req.body.have_read
    }, {
        where: { id: req.params.id }

    }).then(function (data) {
        res.json(data);
        // location.reload();
    })

})

//get request for viewing completed list
router.get("/profile", function (req, res) {
    console.log(db.Completed)
    if (req.user) {
        db.Book.findAll({ where: { UserId: req.user.id } }).then(function (compdata) {
            res.render("profile", {
                Book: compdata
            });
        })

    } else {
        // unauthorized request
        res.redirect('/');
    }

})

router.get("/wishlist", function (req, res) {
    console.log(db.Book)
    if (req.user) {
        db.Book.findAll({ where: { UserId: req.user.id } }).then(function (Bookdata) {
            res.render("wishlist", {
                Book: Bookdata
            });
        })

    } else {
        // unauthorized request
        res.redirect('/');
    }

})

module.exports = router;