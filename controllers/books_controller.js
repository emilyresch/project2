var router = require("express").Router();
var db = require("../models");
const axios = require('axios');
var passport = require("../config/passport");

// homepage (login/signup)
router.get("/", function (req, res) {
    //render homepage
    res.render("index");
})

router.get("/api/login", function(req,res) {
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
    }).catch(function(err) {
        res.status(401).json(err);
    })

})

//post request for login of old user
router.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
})


//get request for search page when user signs up/logs in
router.get("/api/booksearch", function (req, res) {
    //search page
    res.render("search")
})

// post request when user inputs search credentials
router.get("/api/booksearch/bookname", function (req, res) {
    var bookName = req.body.title;
    console.log("success");
    
    var nameArray = bookName.split(" ");
    var newBookName = nameArray.join("+");
    newBook(newBookName, function(bookData){
        res.render("search", {
        books: bookData
    });
    });
    // var bookData = newBook(newBookName)
    // console.log(bookData);
    
    // res.render("search", {
    //     books: bookData
    // });
    
})

router.post("/api/booksearch/bookname", function (req, res) {
    var bookName = req.body.title;
    var nameArray = bookName.split(" ");
    var newBookName = nameArray.join("+");
    // var book = newBook(newBookName);
    // res.json(book)
    newBook(newBookName, function(bookData){
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
            console.log(response.data);
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
    
}

// router.get("/api/booksearch/bookname", function (req, res) {
//   var bookName = req.body.title;
//   var bookArray = [];
//   var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + bookName;
//     axios.get(queryURL)
//         .then(function (response) {
//             console.log(response.data);
//             var apiData = response.data;
//             for (var i = 0; i < 6; i++) {
//                 bookArray.push(apiData.items[i])
//             }
//         })
//         res.render("search", {
//                     books: bookArray
//                 });
//     })



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

//get request for viewing wishlist and completed list
router.get("/api/profile", function (req, res) {
    console.log("got a GET request from profile")
    res.send("Hi! THis is the profile page");
    // db.Wish.findAll({}).then(function (wishdata) {
    //     res.render("displaytables", { wish: wishdata});
    // })

    // db.Complete.findAll({}).then(function (compdata) {
    //     res.render("displaytables", { complete: compdata});
    // })
})


module.exports = router;