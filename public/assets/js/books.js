
    var searchBooks = $("#searchButton");


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



