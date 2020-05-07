var profileBtn = $(".profile-nav");

profileBtn.on("click", function (e) {
  e.preventDefault();
  console.log("got a GET request from profile")

  $.ajax("/", {
    type: "GET"
  }).then(
    function () {
      console.log("going to profile page");
      // Reload the page to get the updated list
      // location.reload();
      window.location.replace("/profile");

    })
})

var wishlistBtn = $(".wishlist-nav");

wishlistBtn.on("click", function (e) {
  e.preventDefault();
  console.log("got a GET request from wishlist")

  $.ajax("/", {
    type: "GET"
  }).then(
    function () {
      console.log("going to wishlist page");
      // Reload the page to get the updated list
      // location.reload();
      window.location.replace("/wishlist");

    })
})

var clickTitle = $(".title-click");

clickTitle.on("click", function(e) {
  e.preventDefault();
  console.log("Back to search page!");

  $.ajax("/", {
    type: "GET"
  }).then(
    function() {
      console.log("Going back to search!");
      window.location.replace("/booksearch");
    }
  )
});

var signoutBtn = $(".signout-nav");

signoutBtn.on("click", function(e) {
  e.preventDefault();
  console.log("Logging out!");

  $.ajax("/logout", {
    type: "GET"
  }).then(
    function(result) {
      console.log("Logged out!");
      window.location.replace("/");
     
    }
  )
});

var themeBtn = $(".theme-nav");

themeBtn.on("click", function(e) {
  e.preventDefault();
  console.log("Changing theme!");

  document.body.classList.toggle("dark-mode");
  
  if (document.getElementsByClassName("mdc-card") !== null) {
    var cards = document.getElementsByClassName("mdc-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("dark-mode-card");
    }
  }
  else if (document.getElementById("table1") !== null) {
    document.getElementById("table1").classList.toggle("dark-mode-card");
  }

  else if (document.getElementById("table2") !== null) {
    document.getElementById("table2").classList.toggle("dark-mode-card");
  }
});