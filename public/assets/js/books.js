// $(document).function() {
    //search button id
    var searchBooks = $("#");


    searchBooks.on("click",function(event){
        event.preventDefault();
        //book name id
        var bookName = $("#").val();
        apicallFunction(bookName);
        })
  
    //book name id
    $("#").keypress(function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if(keyCode == '13'){
            // book name id
            var bookName = $("#").val();
        apicallFunction(bookName);
        }
    })

    function apicallFunction(bookName) {
        var nameArray = bookName.split(" ");

        var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + bookName;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var date = today.getMonth() + '/' + (today.getDate()) + '/' + today.getFullYear();
            console.log(date);
            $("#cityName").text(cityName);
            $("#cityDate").text(date);

            var tempC = response.main.temp;

        });
    }
// })