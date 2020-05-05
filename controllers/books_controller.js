
var db = require("../models");

//homepage (login/signup)
// router.get("/", function (req, res) {
//     //render homepage
//     res.render("index");
// })


//post request for new user signup
router.post("/api/signup", function (req, res) {

    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(function (data) {
        res.json(data);
    })

})

//post request for login of old user
router.post("/api/login", function (req, res) {

})


//get request for search page when user signs up/logs in
router.get("/api/booksearch", function (req, res) {
    //search page
    res.render("")
})

router.post("/api/booksearch/bookname", function(req, res){

})

//get request for search results from Books API
router.get("/api/results", function (req, res) {
    res.render("")
})


//update request when user favorites/unfavorites a book
router.put("api/book/:id", function (req, res) {
    db.Wish.update({
        favorite: req.body.favorite
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.json(data)
    });
    db.Current.update({
        favorite: req.body.favorite
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.json(data)
    });
    db.Complete.update({
        favorite: req.body.favorite
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (data) {
        res.json(data)
    });
})

//update request for moving wishlist book to current book
router.put("api/book/:id", function (req, res) {
    db.Wish.update({
        currently: req.body.currently
    }, {
        where: {
            id: req.body.id
        }
    }).then(function (data) {
        res.json(data);
    })
})

//update request for moving wishlist book to completed books
router.put("api/book/:id", function (req, res) {
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

//get request for viewing wishlist, current list, and completed list
router.get("api/booklists", function (req, res) {
    db.Wish.findAll({}).then(function (data) {
        res.json(data);
    })
    db.Complete.findAll({}).then(function (data) {
        res.json(data);
    })
    db.Current.findAll({}).then(function (data) {
        res.json(data);
    })
})

module.exports = router;