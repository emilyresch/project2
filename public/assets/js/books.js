
    var searchBooks = $("#searchButton");
    var addWishlist = $('#wishlist-btn');

    //search button onclick event
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

    //click star to add to wishlist (Database)
    addWishlist.on("click", function(event){
        event.preventDefault();

    var newBook = {
      author: $(this).volumeInfo.authors,
      title: $(this).volumeInfo.title
    };

    // Send the POST request.
    $.ajax("/api/book", {
      type: "POST",
      data: newBook
    }).then(
      function() {
        console.log("created new Wishlist Book");
        // Reload the page to get the updated list
        location.reload();
      }
    );
    })


