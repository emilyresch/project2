var searchBooks = $("#searchbutton");
var searchButton = $(".searchbutton");
var addWishlist = $('.wishlist-btn');
var addComplete = $('.read-btn');
var searchBook = $(".booksearch");

$("#search-section").css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 });

//search button onclick event
searchButton.on("click", function (event) {
    event.preventDefault();
    $(".newCard").remove();
    console.log("heiii");
    var title = searchBook.val().trim();

    searchforBook(title);

    // bookName.val("");
})
function searchforBook(title) {
    console.log(title);
    $.post("/api/booksearch/title", {
        title: title
    })
        .then(function () {
            console.log("Searching for book");
            // location.reload();
            getBook(title);
        })
}

function getBook(bookTitle) {
    $.get("/api/search/" + bookTitle).then(function (bookdata) {
        // console.log(bookTitle);
        for (var i = 0; i < bookdata.length; i++) {
            var title = bookdata[i].volumeInfo.title;
            var author = bookdata[i].volumeInfo.authors;
            var description = bookdata[i].volumeInfo.description;
            var buyLink = bookdata[i].saleInfo.buyLink;
            var bookImage = bookdata[i].volumeInfo.imageLinks.thumbnail;
            //   console.log(bookImage);


            var divRow = document.createElement("div");
            divRow.setAttribute("class", "mdc-card newCard mdc-layout-grid__inner");
            document.body.appendChild(divRow);

            var divColumn = document.createElement("div");
            divColumn.setAttribute("class", "mdc-layout-grid__cell--span-2");
            divRow.appendChild(divColumn);

            var imageElement = document.createElement("img");
            imageElement.setAttribute("class", "imageAttribute");
            imageElement.setAttribute('style', 'height:auto'); //
            imageElement.setAttribute("src", bookImage);
            divColumn.appendChild(imageElement);

            var divElement = document.createElement("div");
            divElement.setAttribute("class", "mdc-layout-grid__cell--span-10");
            divRow.appendChild(divElement);

            var titleElement = document.createElement("h4");
            titleElement.setAttribute("class", "attributes");
            titleElement.textContent = title;
            divElement.appendChild(titleElement);

            if (bookdata[i].volumeInfo.publishedDate !== undefined) {
                var year = bookdata[i].volumeInfo.publishedDate.split("-")[0];

                var yearElement = document.createElement("h4");
                yearElement.setAttribute("class", "attributes");
                yearElement.textContent = year;
                divElement.appendChild(yearElement);
            }

            var authorElement = document.createElement("h5");
            authorElement.setAttribute("id", "authorAttribute");
            authorElement.setAttribute("class", "attributes");
            authorElement.textContent = author;
            divElement.appendChild(authorElement);

            var descriptionElement = document.createElement("p");
            descriptionElement.setAttribute("id", "descriptionAttribute");
            descriptionElement.setAttribute("class", "attributes");
            descriptionElement.textContent = description;
            divElement.appendChild(descriptionElement);


            var actionsDiv = document.createElement("div");
            actionsDiv.setAttribute("class", "mdc-card__action-icons");
            divElement.appendChild(actionsDiv);

            if (buyLink == undefined || buyLink == "") {
                var buyElement = document.createElement("p");
                buyElement.setAttribute("class", "attributes");
                buyElement.textContent = "Not available";
                actionsDiv.appendChild(buyElement);
            }
            else {
                var buyElement = document.createElement("a");
                buyElement.setAttribute("href", buyLink);
                buyElement.setAttribute("target", "_blank");
                buyElement.setAttribute("class", "attributes");
                actionsDiv.appendChild(buyElement);

                var buyButton = document.createElement("button");
                buyButton.setAttribute("class", "mdc-fab mdc-fab--extended");
                var rippleEffect = document.createElement("div");
                rippleEffect.setAttribute("class", "mdc-fab__ripple");
                var buyIcon = document.createElement("span");
                buyIcon.setAttribute("class", "material-icons mdc-fab__icon");
                buyIcon.textContent = "attach_money";
                var buyText = document.createElement("span");
                buyText.setAttribute("class", "mdc-fab__label");

                if (bookdata[i].saleInfo.saleability === "FREE") {
                    buyText.textContent = "FREE";
                }
                else {
                    buyText.textContent = "Buy $" + bookdata[i].saleInfo.retailPrice.amount;
                }

                buyButton.appendChild(rippleEffect);
                buyButton.appendChild(buyIcon);
                buyButton.appendChild(buyText);

                buyElement.appendChild(buyButton);

                actionsDiv.appendChild(buyElement);
            }

            var bookmarkButton = document.createElement("button");
            bookmarkButton.setAttribute("class", "read-btn material-icons mdc-icon-button mdc-card__action mdc-card__action--icon");
            bookmarkButton.setAttribute("data-id", i);
            bookmarkButton.setAttribute("data-author", bookdata[i].volumeInfo.authors);
            bookmarkButton.setAttribute("data-title", bookdata[i].volumeInfo.title);
            bookmarkButton.setAttribute("aria-label", "Mark as Read");
            bookmarkButton.textContent = "bookmark_border";
            actionsDiv.appendChild(bookmarkButton);

            var wishButton = document.createElement("button");
            wishButton.setAttribute("class", "wishlist-btn material-icons mdc-icon-button mdc-card__action mdc-card__action--icon");
            wishButton.setAttribute("data-id", i);
            wishButton.setAttribute("data-author", bookdata[i].volumeInfo.authors)
            wishButton.setAttribute("data-title", bookdata[i].volumeInfo.title)
            wishButton.setAttribute("aria-label", "Wishlist");
            wishButton.textContent = "star_border";
            actionsDiv.appendChild(wishButton);


        }
    })
}

//click star to add to wishlist (Database)
$(document).on("click", ".wishlist-btn", function (event) {
    event.preventDefault();
    console.log("wish");
    $(this).text("star");

    var newBook = {
        author: $(this).data("author"),
        title: $(this).data("title")
    };
    console.log(newBook)

    // Send the POST request.
    $.ajax("/api/book", {
        type: "POST",
        data: newBook
    }).then(
        function (response) {
            console.log("created new Wishlist Book");
        }
    );
})

//click tag to add to hav_read (Database)
$(document).on("click", ".read-btn", function (event) {
    event.preventDefault();
    $(this).text("bookmark")

    var newBook = {
        author: $(this).data("author"),
        title: $(this).data("title"),
        have_read: true
    };

    // Send the POST request.
    $.ajax("/api/completed", {
        type: "POST",
        data: newBook
    }).then(
        function () {
            console.log("created new Completed Book");
        }
    );
})


//////UNREAD TO READ
var unreadBtn = $(".update-unread-btn");

unreadBtn.on("click", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    console.log(this);

    var readState = {
        have_read: false
    }

    console.log(readState);

    $.ajax("/api/book/" + id, {
        type: "POST",
        data: readState
    }).then(
        function () {
            console.log("updated to unread");
            // Reload the page to get the updated list
            location.reload();
        }
    );
})



//READ to UNREAD
var readBtn = $(".update-read-btn");

readBtn.on("click", function (e) {
    e.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    console.log(this);
    var readState = {
        have_read: true
    }
    console.log("new state is", readState);

    $.ajax("/api/book/" + id, {
        type: "POST",
        data: readState
    }).then(
        function () {
            console.log("updated to read");
            // Reload the page to get the updated list
            location.reload();
        }
    );
})