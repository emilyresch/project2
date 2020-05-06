var profileBtn = $(".profile-nav");

profileBtn.on("click", function(e){
    e.preventDefault();
    //

    $.ajax("/api/profile", {
        type: "GET",
        data: newBook
      }).then(
        function() {
          console.log("going to profile page");
          // Reload the page to get the updated list
          location.reload();
        })
})