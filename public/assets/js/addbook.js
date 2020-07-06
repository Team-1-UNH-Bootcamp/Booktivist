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
const currentBook = null;
$('#bookInfo').hide();
$('#extraInfo').hide();

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
  const isbnWithoutHyphens = isbn.replace(/-/g, '');
  const googleAPI = `https://www.googleapis.com/books/v1/volumes?q=${isbnWithoutHyphens}`;
  $.getJSON(googleAPI, (response) => {
    if (typeof response.items === 'undefined') {
      console.log('error ');
    } else {
      populateFields(response.items[0]);
      console.log(currentBook);

      $('#bookInfo').show();
    }
  });
});

$('#infoReject').click(() => {
  $('#bookInfo').hide();
  console.log(currentBook);
});
$('#infoSubmit').click((e) => {
  e.preventDefault();
  $('#extraInfo').show();
  console.log(currentBook);
});

$('#submitBook').click((e) => {
  e.preventDefault();
  $('#extraInfo').show();
  const category = $('#categorySelect').val();
  const addYouTube = $('#addYouTube').val();
  const textarea = $('#textarea').val();
  console.log(category, addYouTube, textarea);
  const payload = {

    thumbnail: currentBook.volumeInfo.imageLinks.thumbnail,
    title: currentBook.volumeInfo.title,
    authors: currentBook.volumeInfo.authors.join(', '),
    description: currentBook.volumeInfo.description,
    publishedDate: currentBook.volumeInfo.publishedDate,
    category,
    youTubeLink: addYouTube,
    parentInsights: textarea,
  };
  console.log(payload);

  $.post('#', payload,
    (data, status) => {
      console.log(data, status);
    });
});
