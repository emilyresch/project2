
    var searchButton = $("#searchbutton");
    var addWishlist = $('#wishlist-btn');
    var searchBook = $(".booksearch");

    //search button onclick event
    searchButton.on("click",function(event){
        event.preventDefault();
        console.log("heiii");
        var bookName = searchBook.val().trim();
        

        // if(!bookName){
        //     return;
        // }

        searchforBook(bookName);
        
        // bookName.val("");
    })
    function searchforBook(bookName){
      console.log(bookName);
        $.post("/api/booksearch/bookname",{
            title: bookName
        })
        .then(function(){
            console.log("Searching for book");
            // location.reload();
            getBook(bookName)
        })   
    }

    function getBook(bookName){
      $.get("/api/booksearch/bookname",{
        title: bookName
      })
      .then(function(){
        console.log("book book");
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


