/* eslint-disable operator-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-restricted-globals */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
$('#bookInfo').hide();
$('#extraInfo').hide();

// pulls values from api call into html
function populateFields(book) {
  $('#populateImg').attr('src', book.volumeInfo.imageLinks.thumbnail);
  $('#populateBook').val(book.volumeInfo.title);
  $('#populateSubtitle').val(book.volumeInfo.subtitle);
  $('#populateAuthor').val(book.volumeInfo.authors.join(', '));
  $('#populateDesc').val(book.volumeInfo.description);
  $('#populateIllustrator').val(book.volumeInfo.thumbnail);
  $('#populateDate').val(book.volumeInfo.publishedDate);
}

// on isbn submit, search google books api
$('#isbnSubmit').click(() => {
  const isbn = $('#isbnInput').val();
  let isbnWithoutHyphens = isbn.replace(/-/g, '');
  const googleAPI = `https://www.googleapis.com/books/v1/volumes?q=${isbnWithoutHyphens}`;
  $.getJSON(googleAPI, (response) => {
    // no response from google books API - return error message
    if (typeof response.items === 'undefined') {
      const alertISBN = $('<div>')
        .attr({
          class: 'alert alert-danger',
          role: 'alert',
        })
        .text('We could not find a book matching that ISBN. Please try again.');
      $('#isbn').append(alertISBN);
    } else {
      populateFields(response.items[0]);

      $('#bookInfo').show();
      $('#isbn').hide();
    }
    // if isbn is not right, reject and reenter isbn
    $('#infoReject').click(() => {
      $('#bookInfo').hide();
      $('#isbn').show();
      console.log(response);
    });
    // if isbn is right, review info and submit
    $('#infoSubmit').click((e) => {
      e.preventDefault();
      console.log($('#populateDate').val());
      // date validation
      if ($('#populateDate').val().length < 10) {
        const alertDiv = $('<div>')
          .attr({
            class: 'alert alert-danger',
            role: 'alert',
          })
          .text('Please Enter the Date as MM/DD/YYYY');
        $('#bookInfo').append(alertDiv);
      } else if (
        // author and book title validation
        $('#populateBook').val() === '' ||
        $('#populateAuthor').val() === ''
      ) {
        const alertDiv = $('<div>')
          .attr({
            class: 'alert alert-danger',
            role: 'alert',
          })
          .text('Title and Author cannot be blank');
        $('#bookInfo').append(alertDiv);
      } else {
        $('#extraInfo').show();
        $('#bookInfo').hide();
      }
    });

    $('#backButton').click((e) => {
      e.preventDefault();
      $('#bookInfo').show();
      $('#extraInfo').hide();
    });

    $('#submitBook').click((e) => {
      e.preventDefault();
      if (isbnWithoutHyphens.length > 10) {
        isbnWithoutHyphens = isbnWithoutHyphens.slice(
          3,
          isbnWithoutHyphens.length
        );
      }
      $('#extraInfo').show();
      const categoriesArray = [];
      const categoriesById = $('.checkbox:checked')
        .map(function() {
          return this.id;
        })
        .get();
      if (categoriesById.length === 0) {
        const alertDiv = $('<div>')
          .attr({
            class: 'alert alert-danger',
            role: 'alert',
          })
          .text('Please Select at Least One Category');
        $('#extraInfo').append(alertDiv);
        setTimeout(() => {
          alertDiv.remove();
        }, 2000);
      } else {
        categoriesById.forEach((cat) => {
          categoriesArray.push(Number(cat));
        });
        // use information provided to create an object to send to backend
        // for post request
        const payload = {
          title: $('#populateBook').val(),
          subtitle: $('#populateSubtitle').val(),
          author: $('#populateBook').val(),
          illustrator: $('#populateIllustrator').val(),
          description: response.items[0].volumeInfo.description,
          image_link: response.items[0].volumeInfo.imageLinks.thumbnail,
          key_talking_points: $('#textarea').val(),
          isbn: Number(isbnWithoutHyphens),
          pub_date: $('#populateDate').val(),
          youtube_link: $('#addYouTube').val(),
          categories: categoriesArray,
        };
        console.log(payload);

        // submit newly added book to backend
        const submitAnswers = () => {
          return new Promise((resolve, reject) => {
            $.ajax({
              url: '/api/books',
              type: 'POST',
              data: payload,
              success: function(data) {
                resolve(data);
                const alertSuccess = $('<div>')
                  .attr({
                    class: 'alert alert-success',
                    role: 'alert',
                  })
                  .text(
                    'Thank you so much for your submission to Kid Booktivist. This title has been submitted for admin approval.'
                  );
                $('#extraInfo').hide();
                $('.successDiv').append(alertSuccess);
                setTimeout(() => {
                  location.reload();
                }, 3500);
              },
              error: function(error) {
                reject(error);
                console.log('hello?');
                const alertFail = $('<div>')
                  .attr({
                    class: 'alert alert-warning',
                    role: 'alert',
                  })
                  .text(
                    'Something went wrong with your submission. Please make sure all required fields are properly filled out'
                  );
                $('#extraInfo').hide();
                $('.successDiv').append(alertFail);
                setTimeout(() => {
                  location.reload();
                }, 3500);
              },
            });
          });
        };

        submitAnswers();
      }
    });
  });
});
