// click event - search ISBN
// ajax call to google books API
// return book info from first book
// take specifics and populate review form
// append to the dom, clear previous search
// two buttons - prev and next
// prev - clear dom and replace with ISBN search
// next - clear dom and replace with final info
// on submit, take all info from user and google books, set to obj
// and submit to backend


// $.ajax("/api/books", {type: 'POST', data: bookObj}).then(()=>{})
// add that to the books table and set added to false
var currentBook = null;
$("#bookInfo").hide();
$("#extraInfo").hide();

$('#isbnSubmit').click(() => {
    var isbn = $('#isbnInput').val();
    var isbn_without_hyphens = isbn.replace(/-/g, "");
    var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=" + isbn_without_hyphens;
    $.getJSON(googleAPI, function(response) {
        if (typeof response.items === "undefined") {
            alert("No populatebooks match that ISBN.");
        } else {
            currentBook = response.items[0];
            populateFields(response.items[0]);
            console.log(currentBook);

            $("#bookInfo").show();

        }
    });
});

$('#infoReject').click(() => {

    $("#bookInfo").hide();
    console.log(currentBook);



});
$('#infoSubmit').click((e) => {
    e.preventDefault()
    $("#extraInfo").show();
    console.log(currentBook);

});

$('#submitBook').click((e) => {
    e.preventDefault()
    $("#extraInfo").show();
    const category = $("#categorySelect").val()
    const addYouTube = $("#addYouTube").val()
    const textarea = $("#textarea").val()
    console.log(category, addYouTube, textarea);
    const payload = {

        thumbnail: currentBook.volumeInfo.imageLinks.thumbnail,
        title: currentBook.volumeInfo.title,
        authors: currentBook.volumeInfo.authors.join(", "),
        description: currentBook.volumeInfo.description,
        publishedDate: currentBook.volumeInfo.publishedDate,
        category: category,
        youTubeLink: addYouTube,
        parentInsights: textarea
    }
    console.log(payload)

    $.post("#", payload,
        function(data, status) {
            console.log(data, status);
        }
    );
});



function populateFields(book) {

    $("#populateImg").attr("src", book.volumeInfo.imageLinks.thumbnail)
    $("#populateBook").val(book.volumeInfo.title)
    $("#populateAuthor").val(book.volumeInfo.authors.join(", "))
    $("#populateDesc").val(book.volumeInfo.description)
    $("#populateIllustrator").val(book.volumeInfo.thumbnail)
    $("#populateDate").val(book.volumeInfo.publishedDate)


}