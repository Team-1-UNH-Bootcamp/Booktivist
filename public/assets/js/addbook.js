/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
$('#bookInfo').hide();
$('#extraInfo').hide();

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
  $('#populateSubtitle').val(book.volumeInfo.subtitle);
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
    console.log(response);
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

    $('#backButton').click((e) => {
      e.preventDefault();
      $('#bookInfo').show();
      $('#extraInfo').hide();
    });

    $('#submitBook').click((e) => {
      e.preventDefault();
      $('#extraInfo').show();
      const categoriesArray = [];
      const categoriesById = $('.checkbox:checked')
        .map(function() {
          return this.id;
        })
        .get();
      categoriesById.forEach((cat) => {
        categoriesArray.push(Number(cat));
      });
      const fetchIllustrator = $('#populateIllustrator').val();
      const category = $('#categorySelect').val();
      const addYouTube = $('#addYouTube').val();
      const textarea = $('#textarea').val();
      console.log(category, addYouTube, textarea);
      const payload = {
        title: response.items[0].volumeInfo.title,
        subtitle: response.items[0].volumeInfo.subtitle,
        author: response.items[0].volumeInfo.authors.join(', '),
        illustrator: fetchIllustrator,
        description: response.items[0].volumeInfo.description,
        image_link: response.items[0].volumeInfo.imageLinks.thumbnail,
        key_talking_points: textarea,
        isbn: Number(isbnWithoutHyphens),
        pub_date: response.items[0].volumeInfo.publishedDate,
        youtube_link: addYouTube,
        categoires: categoriesArray,
      };
      console.log(payload);
      // const categoryIds = [];

      console.log(categoriesArray);
      // categoriesArray.forEach((thingy) => {
      //   console.log(thingy);
      // });
      $.ajax('/api/books', { type: 'POST', data: payload }).then((data) => {
        console.log(data);
      });
    });
  });
});
