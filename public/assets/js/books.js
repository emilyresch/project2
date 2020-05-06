
    var searchBooks = $("#searchbutton");
    var addWishlist = $('.wishlist-btn');
    var addComplete = $('.read-btn');
    var searchBook = $(".booksearch");

    //search button onclick event
    searchBooks.on("click",function(event){
        event.preventDefault();
        console.log("heiii");
        var title = searchBook.val().trim();
        // if(!bookName){
        //     return;
        // }

        searchforBook(title);
        
        // bookName.val("");
    })
    function searchforBook(title){
      console.log(title);
        $.post("/api/booksearch/title",{
            title: title
        })
        .then(function(){
            console.log("Searching for book");
            // location.reload();
            getBook(title)
        })   
    }

    function getBook(bookTitle){
      $.get("/api/booksearch/" + bookTitle).then(function(){
        console.log(bookTitle);
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

      //click tag to add to hav_read (Database)
    addComplete.on("click", function(event){
        event.preventDefault();

    var newBook = {
      author: $(this).volumeInfo.authors,
      title: $(this).volumeInfo.title
    };

    // Send the POST request.
    $.ajax("/api/completed", {
      type: "POST",
      data: newBook
    }).then(
      function() {
        console.log("created new Completed Book");
        // Reload the page to get the updated list
        location.reload();
      }
    );
    })


