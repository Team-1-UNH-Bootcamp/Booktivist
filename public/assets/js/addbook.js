$('#bookInfo').show();
$('#extraInfo').show();

// $.ajax('api/categoreis', { type: 'GET' }).then((response) => {
//   response.forEach((data) => {
//     const option = $('<option>')
//       .attr({ value: data })
//       .text(data);
//     $('#categorySelect').append(option);
//   });
// });

function populateFields(book) {
    $('#populateImg').attr('src', book.volumeInfo.imageLinks.thumbnail);
    $('#populateBook').val(book.volumeInfo.title);
    $('#populateAuthor').val(book.volumeInfo.authors.join(', '));
    $('#populateDesc').val(book.volumeInfo.description);
    $('#populateIllustrator').val(book.volumeInfo.thumbnail);
    $('#populateDate').val(book.volumeInfo.publishedDate);
}
$('#isbnSubmit').click(() => {
    const isbn = $('#isbnInput').val();
    console.log(isbn);
    const isbnWithoutHyphens = isbn.replace(/-/g, '');
    const googleAPI = `https://www.googleapis.com/books/v1/volumes?q=${isbnWithoutHyphens}`;
    $.getJSON(googleAPI, (response) => {
        if (typeof response.items === 'undefined') {
            console.log('error ');
        } else {
            populateFields(response.items[0]);

            $('#bookInfo').show();
            $('#isbn').hide();
        }

        $('#infoReject').click(() => {
            $('#bookInfo').hide();
            $('#isbn').show();
            console.log(response);
        });
        $('#infoSubmit').click((e) => {
            e.preventDefault();
            $('#extraInfo').show();
            $('#bookInfo').hide();
        });

        $('#submitBook').click((e) => {
            e.preventDefault();
            $('#extraInfo').show();
            const category = $('#categorySelect').val();
            const addYouTube = $('#addYouTube').val();
            const textarea = $('#textarea').val();
            console.log(category, addYouTube, textarea);
            const payload = {
                isbn: isbnWithoutHyphens,
                thumbnail: response.items[0].volumeInfo.imageLinks.thumbnail,
                title: response.items[0].volumeInfo.title,
                authors: response.items[0].volumeInfo.authors.join(', '),
                description: response.items[0].volumeInfo.description,
                publishedDate: response.items[0].volumeInfo.publishedDate,
                category,
                youTubeLink: addYouTube,
                parentInsights: textarea,
            };
            console.log(payload);

            // $.ajax("/api/books", {type: 'POST', data: bookObj}).then((response)=>{
            // console.log(response)
            // })
        });
    });
});