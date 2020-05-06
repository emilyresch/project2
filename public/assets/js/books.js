
    var searchBooks = $("#searchButton");
    var addWishlist = $('#wishlist-btn');

    searchBooks.on("click",function(event){
        event.preventDefault();
        var bookName = $("#bookSearch").val();
        if(!bookName){
            return;
        }
        searchforBook(bookName);
        bookName.val("");
    })
    function searchforBook(bookName){
        $.post("/api/booksearch/bookname",{
            title: bookName
        })
        .then(function(){
            console.log("Searching for book");
            location.reload();
        })
    }

    addWishlist.on("click", function(event){
        event.preventDefault();

    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
    })


