/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
$(document).ready(() => {
  const argument = 'adminReview';
  loadBooks(argument);
});

const getBooks = (category) => {
  return new Promise((resolve, reject) => {
    $.ajax('/api/admin/books', { type: 'GET' })
      .then((response) => {
        console.log(response);
        response.forEach((data) => {
          const apiTitle = 'title';
          const apiId = 'id';
          const apiAuthor = 'author';
          const apiImg = 'image_link';

          const parentDiv = $('<div>').attr({ class: 'col-lg-3 col-sm-12' });
          const cardDiv = $('<div>').attr({ class: 'card' });
          const cardImg = $('<img>').attr({
            class: 'card-img-top',
            src: data[apiImg],
            alt: 'Card Img Top',
          });
          const cardBody = $('<div>')
            .attr({ class: 'card-body' })
            .css({
              paddingLeft: '5px',
              paddingRight: '5px',
              paddingBotton: '10px',
            });
          const linkTitle = $('<button>')
            .attr({ class: 'titleModal', value: data[apiId] })
            .attr('data-toggle', 'modal')
            .attr('data-target', '#bookModal')
            .css({ border: 'none', backgroundColor: 'white' });
          const bookTitle = $('<h3>')
            .attr({ class: 'card-title' })
            .text(data[apiTitle]);
          const bookAuthor = $('<h4>')
            .attr({ class: 'card-subtitle' })
            .text(data[apiAuthor]);
          const br = $('<br>');
          $(linkTitle).append(bookTitle, br, bookAuthor);
          $(cardBody).append(cardImg, linkTitle);
          $(cardDiv).append(cardBody);
          // cardImg,
          $(parentDiv).append(cardDiv);

          $(`#${category}`).append(parentDiv);
          resolve(response);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const loadBooks = (arg) => {
  $.when(getBooks(arg)).then(() => {
    getModal();
  });
};

$('#button-addon1').click(function(event) {
  event.preventDefault();
  const targetUrl = $('#searchBar')
    .val()
    .replace(/ /g, '&')
    .toLowerCase();

  window.location.href = `/categories/?search=${targetUrl}`;
});

const getModal = () => {
  $('.titleModal').click(function() {
    // $('.modal-content').text('');
    const index = this.value;
    fillModal(index);
  });
};

const fillModal = (i) => {
  $.ajax(`/api/book/${i}`, { type: 'GET' }).then((response) => {
    $('.modalCoverJpg').attr({
      src: response.image_link,
    });
    $('.modalBookTitle ').val(
      // eslint-disable-next-line comma-dangle
      response.title
    );
    $('.modalBooksubTitle').val(response.subtitle);
    $('.modalBookAuthor').val(
      // eslint-disable-next-line comma-dangle
      `By: ${response.author}`
    );
    $('.modalBookIllustrator').val(response.illustrator);
    $('.descriptionHeader').text('Description:');
    $('.bookDesc').val(response.description);
    $('.keyPointsHeader').text('Key Discussion Points');
    $('.keyPoints').val(response.key_talking_points);
    const youTubeLink = response.youtube_link;
    if (youTubeLink !== null) {
      $('.youTubeLink')
        .attr({ href: youTubeLink })
        .val('Watch This Book Being Read on YouTube');
    }
    $('.pubDate').val(response.pub_date);
    $('.isbn').val(response.isbn);

    $('#addToTable').click(() => {
      console.log(i);
      $.ajax(`/api/admin/books/${i}`, { type: 'PUT' }).then((addeds) => {
        console.log(addeds);
        const success = $('<h1>')
          .text('Book Added Succesfully')
          .css({ textAlign: 'center' });
        $('.modal-content').text('');
        $('.modal-content').append(success);
      });
    });
    $('#deleteFromTable').click(() => {
      console.log('remove');
      $.ajax(`/api/admin/books/${i}`, { type: 'DELETE' }).then(() => {
        const removed = $('<h1>')
          .text('Book Removed Successfully')
          .css({ textAlign: 'center' });
        $('.modal-content').text('');
        $('.modal-content').append(removed);
      });
    });
  });
};
