var router = require("express").Router();
var db = require("../models");
const axios = require('axios');
var passport = require("../config/passport");
var Sequelize = require("sequelize");

// homepage (login/signup)
router.get("/", function (req, res) {
    //render homepage
    res.render("index");
})

router.get("/api/login", function (req, res) {
    if (req.user) {
        res.redirect("/api/booksearch");
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
        res.redirect(307, "/api/login");
    }).catch(function (err) {
        res.status(401).json(err);
    })

})

//post request for login of old user
router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
})


//get request for search page when user signs up/logs in
router.get("/api/booksearch", function (req, res) {
    res.render("search")
})

// post request when user inputs search credentials
router.get("/api/booksearch/:title", function (req, res) {
    var title = req.params.title;
    var nameArray = title.split(" ");
    var newBookName = nameArray.join("+");
    newBook(newBookName, function(bookData){
        console.log(bookData);
        res.render("search", {
        books: bookData
    });
    }); 
})

router.post("/api/booksearch/title", function (req, res) {   
    var title = req.body.title;
    var nameArray = title.split(" ");
    var newBookName = nameArray.join("+");
    // var book = newBook(newBookName);
    // res.json(book)
    newBook(newBookName, function (bookData) {
        res.render("search", {
            books: bookData
        });
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
            console.log(bookArray);
            cb(bookArray)
        })

}

function newBook(newBookName) {
    var bookArray = [];
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + newBookName;
    axios.get(queryURL)
        .then(function (response) {
            // console.log(response.data);
            var apiData = response.data;
            for (var i = 0; i < 6; i++) {
                bookArray.push(apiData.items[i])
            }
            // console.log(bookArray);
            return bookArray
        })

            cb(bookArray) 
   
    
}

//get request for search results from Books API
// router.get("/api/results", function (req, res) {
//     res.render("")
// })

//request for adding a book to wishlist table
router.post("/api/book", function (req, res) {
    db.Wish.create(["title", "author"],
        [req.body.title, req.body.author],
        function (data) {
            res.json({
                id: data.insertID
            });
        }
    )
})

//request for adding a book to have_read table
router.post("/api/completed", function (req, res) {
    db.Completed.create(["title", "author"],
        [req.body.author, req.body.title],
        function (data) {
            res.json({
                id: data.insertID
            });
        }
    )
})

//update request for moving wishlist book to completed books
router.put("/api/book/:id", function (req, res) {
    db.Wish.update({
        have_read: req.body.have_read
    }, {
        where: {
            id: req.body.id
        }
    }).then(function (data) {
        res.json(data);
    })
})

//get request for viewing completed list
router.get("/api/profile", function (req, res) {
    console.log(db.Completed)
    
    db.Completed.findAll({}).then(function (compdata) {
        res.render("profile", {
            complete: compdata
        });
    })

})

router.get("/api/wishlist", function (req, res) {
    console.log(db.Wish)

    db.Wish.findAll({}).then(function (wishdata) {
        res.render("wishlist", {
            wish: wishdata
        });
    })
  
})

module.exports = router;