/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
// recently published books - books published in the last month

const recent = ['recent', 'recent'];
const BLM = ['category/3', 'BLM'];
const LGBTQ = ['category/1', 'LGBTQ'];

$(document).ready(() => {
  loadBooks();
});

const getBooks = (category) => {
  return new Promise((resolve, reject) => {
    $.ajax(`/api/books/${category[0]}`, { type: 'GET' })
      .then((response) => {
        const revisedResponse = [];
        for (let i = 0; i < 4; i++) {
          revisedResponse.push(response[i]);
        }
        revisedResponse.forEach((data) => {
          let apiTitle = 'title';
          let apiId = 'id';
          let apiAuthor = 'author';
          let apiImg = 'image_link';
          if (category[0] !== 'recent') {
            apiTitle = 'books.title';
            apiId = 'books.id';
            apiAuthor = 'books.author';
            apiImg = 'books.image_link';
          }

          const parentDiv = $('<div>').attr({
            class: 'col-lg-3 col-sm-12 bookParentDiv',
          });
          const cardDiv = $('<div>').attr({
            class: 'card bookCardDiv h-100',
          });
          const cardImg = $('<img>').attr({
            class: 'card-img-top bookCardImage h-70',
            src: data[apiImg],
            alt: 'Card Img Top',
          });
          const cardBody = $('<div>')
            .attr({ class: 'card-body bookCardBody h-30' })
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
            .attr({ class: 'card-title cardBookTitle' })
            .text(data[apiTitle]);
          const bookAuthor = $('<h4>')
            .attr({ class: 'card-subtitle cardBookAuthor' })
            .text(data[apiAuthor]);

          $(linkTitle).append(bookTitle, bookAuthor);
          $(cardBody).append(linkTitle);
          $(cardDiv).append(cardImg, cardBody);
          // cardImg,
          $(parentDiv).append(cardDiv);

          $(`#${category[1]}`).append(parentDiv);
          resolve(console.log('the data from the api', response));
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const loadBooks = async () => {
  await getBooks(recent);
  await getBooks(BLM);
  await getBooks(LGBTQ);
  getModal();
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
    const index = this.value;
    $.ajax('api/user_data', { type: 'GET' }).then((userData) => {
      if (userData.message === false) {
        notLoggedIn();
      } else {
        $.ajax(`api/mylibrary/${index}`, { type: 'GET' }).then((isAdded) => {
          if (isAdded === null) {
            addBookToLibrary(index);
          } else {
            removeBookFromLibrary(index);
          }
        });
      }
    });
    fillModal(index);
  });
};

const fillModal = (i) => {
  $.ajax(`/api/book/${i}`, { type: 'GET' }).then((response) => {
    $('.modalCoverJpg').attr({
      src: response.image_link,
    });
    $('.modalBookTitle ').text(
      // eslint-disable-next-line comma-dangle
      response.title
    );
    $('.modalBooksubTitle').text(response.subtitle);
    $('.modalBookAuthor').text(
      // eslint-disable-next-line comma-dangle
      `By: ${response.author}`
    );
    $('.modalBookIllustrator').text(`Illustrated By: ${response.illustrator}`);
    $('.descriptionHeader').text('Description:');
    $('.bookDesc').text(response.description);
    $('.keyPointsHeader').text('Key Discussion Points');
    $('.keyPoints').text(response.key_talking_points);
    const youTubeLink = response.youtube_link;
    if (youTubeLink !== null) {
      $('.youTubeLink')
        .attr({ href: youTubeLink })
        .text('Watch This Book Being Read on YouTube');
    }
    $('.pubDate').text(` Published On: ${response.pub_date}`);
    $('.isbn').text(`ISBN: ${response.isbn}`);

    $('#addToTable').click(() => {
      $.ajax(`/api/admin/books/${i}`, { type: 'PUT' }).then(() => {
        const success = $('<h1>')
          .text('Book Added Succesfully')
          .css({ textAlign: 'center' });
        $('.modal-content').text('');
        $('.modal-content').append(success);
      });
    });
    $('#deleteFromTable').click(() => {
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

const notLoggedIn = () => {
  addPlusSign();
  $('#thePlusSign').click(() => {
    const topDiv = $('<div>')
      .attr({ class: 'alert alert-danger notLoggedIn' })
      .text('Please Login To Add This Book To Your Library');
    $('.modal-content').prepend(topDiv);
    setTimeout(() => {
      topDiv.remove();
    }, 2000);
  });
};

const addBookToLibrary = (bookId) => {
  addPlusSign();
  plusMinusBtn(bookId);
};

const removeBookFromLibrary = (bookId) => {
  addMinusSign();
  plusMinusBtn(bookId);
};

const plusMinusBtn = (bookId) => {
  $('#theMinusSign').click(() => {
    $.ajax(`/api/mylibrary/${bookId}`, { type: 'DELETE' }).then(() => {
      $('#theMinusSign').remove();
      addPlusSign();
    });
  });
  $('#thePlusSign').click(() => {
    $.ajax(`/api/mylibrary/${bookId}`, { type: 'POST' }).then(() => {
      $('#thePlusSign').remove();
      addMinusSign();
    });
  });
};

const addPlusSign = () => {
  $('.addBookBtn').remove();
  const plusSign = $('<i>').attr({
    class: 'fa fa-plus plusSign',
    id: 'plusSign',
  });

  const addButton = $('<button>')
    .attr({
      class: 'btn btn-primary addBookBtn',
      id: 'thePlusSign',
    })
    .css({
      position: 'float-left',
      width: '35px',
      height: '35px',
      marginTop: '10px',
    });

  $(addButton).append(plusSign);
  $('.modal-content').prepend(addButton);
};

const addMinusSign = () => {
  $('.addBookBtn').remove();
  const minusSign = $('<i>').attr({
    class: 'fa fa-minus minusSign',
    id: 'minusSign',
  });

  const addButton = $('<button>')
    .attr({
      class: 'btn btn-primary addBookBtn',
      id: 'theMinusSign',
    })
    .css({
      position: 'float-left',
      width: '35px',
      height: '35px',
      marginTop: '10px',
    });

  $(addButton).append(minusSign);
  $('.modal-content').prepend(addButton);
};
