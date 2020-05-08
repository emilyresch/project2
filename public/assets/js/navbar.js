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
  console.log("got a GET request from wishlist");

  $.ajax("/", {
    type: "GET"
  }).then(
    function () {
      console.log("going to wishlist page");
      // Reload the page to get the updated list
      // location.reload();
      window.location.replace("/wishlist");
      $("#wishlist-section").css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 200);
    })
})

var clickTitle = $(".title-click");

clickTitle.on("click", function (e) {
  e.preventDefault();
  console.log("Back to search page!");

  $.ajax("/", {
    type: "GET"
  }).then(
    function () {
      console.log("Going back to search!");
      window.location.replace("/booksearch");
    }
  )
});

var signoutBtn = $(".signout-nav");

signoutBtn.on("click", function (e) {
  e.preventDefault();
  console.log("Logging out!");

  $.ajax("/logout", {
    type: "GET"
  }).then(
    function (result) {
      console.log("Logged out!");
      window.location.replace("/");
    }
  )
});

var themeBtn = $(".theme-nav");

themeBtn.on("click", function (e) {
  e.preventDefault();
  console.log("Changing theme!");

  document.body.classList.toggle("dark-mode");
  if (darkMode === false) darkMode = true;
  else darkMode = false;

  if (document.getElementsByClassName("mdc-card") !== null) {
    var cards = document.getElementsByClassName("mdc-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("dark-mode-card");
    }
  }
  if (document.getElementByClassName("mdc-data-table") !== null) {
    var tables = document.getElementsByClassName("mdc-data-table");
    for (var i = 0; i < cards.length; i++) {
      tables[i].classList.toggle("dark-mode-card");
    }

    var tableCols = document.getElementsByClassName("mdc-data-table__cell");
    for (var i = 0; i < tableCols.length; i++) {
      tableCols[i].classList.toggle("dark-mode-text");
    }
  }
});