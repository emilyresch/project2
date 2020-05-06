var profileBtn = $(".profile-nav");

profileBtn.on("click", function(e){
    e.preventDefault();
    //

    $.ajax("/api/book", {
        type: "GET",
        data: newBook
      }).then(
        function() {
          console.log("created new Wishlist Book");
          // Reload the page to get the updated list
          location.reload();
        })
})