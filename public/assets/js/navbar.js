var profileBtn = $(".profile-nav");

profileBtn.on("click", function(e){
    e.preventDefault();
    console.log("got a GET request from profile")

    $.ajax("/", {
        type: "GET"
      }).then(
        function() {
          console.log("going to profile page");
          // Reload the page to get the updated list
          // location.reload();
          window.location.replace("/api/profile");

        })
})

var wishlistBtn = $(".wishlist-nav");

wishlistBtn.on("click", function(e){
    e.preventDefault();
    console.log("got a GET request from wishlist")

    $.ajax("/", {
        type: "GET"
      }).then(
        function() {
          console.log("going to wishlist page");
          // Reload the page to get the updated list
          // location.reload();
          window.location.replace("/api/wishlist");

        })
})