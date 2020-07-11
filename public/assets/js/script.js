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
// const NAH = 'category/2';

const getBooks = (category) => {
  return new Promise((resolve, reject) => {
    $.ajax(`/api/books/${category[0]}`, { type: 'GET' })
      .then((response) => {
        response.forEach((data) => {
          console.log('hello - 1');
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

          $(linkTitle).append(bookTitle, bookAuthor);
          $(cardBody).append(linkTitle);
          $(cardDiv).append(cardImg, cardBody);
          // cardImg,
          $(parentDiv).append(cardDiv);

          $(`#${category[1]}`).append(parentDiv);
          resolve();
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

loadBooks();

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
    $('.modal-content').text('');
    const index = this.value;
    $.ajax('api/user_data', { type: 'GET' }).then((userData) => {
      if (userData.message === false) {
        notLoggedIn();
      } else {
        $.ajax(`api/mylibrary/${index}`, { type: 'GET' }).then((isAdded) => {
          if (isAdded === null) {
            console.log('notAdded');
            addBookToLibrary(index);
          } else {
            console.log('added');
            removeBookFromLibrary(index);
          }
        });
      }
    });
    fillModal(index);
  });
};

const notLoggedIn = () => {
  console.log('not logged in');
  addPlusSign();
  $('#thePlusSign').click(() => {
    const topDiv = $('<div>')
      .attr({ class: 'alert alert-danger' })
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
  const plusSign = $('<i>').attr({
    class: 'fa fa-plus',
    id: 'plusSign',
  });

  const addButton = $('<button>')
    .attr({
      class: 'btn btn-primary',
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
  const minusSign = $('<i>').attr({
    class: 'fa fa-minus',
    id: 'minusSign',
  });

  const addButton = $('<button>')
    .attr({
      class: 'btn btn-primary',
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

const fillModal = (i) => {
  $.ajax(`/api/book/${i}`, { type: 'GET' }).then((response) => {
    const bookJpg = $('<img>').attr({
      src: response.img_link,
      class: 'col-sm-4',
    });
    const bookTitle = $('<h5>').text(
      // eslint-disable-next-line comma-dangle
      `TITLE: ${response.title}`
    );
    const bookSubtitle = $('<h6>').text('');
    const bookAuthor = $('<h6>').text(
      // eslint-disable-next-line comma-dangle
      `AUTHOR: ${response.author}`
    );
    const bookIllustrator = $('<h6>').text('');
    const bookDescriptionHeader = $('<h6>').text('Description:');
    const bookDescription = $('<p>')
      .text(response.description)
      .attr({ id: 'bookDesc' });
    const keyPointsHeader = $('<h6>').text('Key Discussion Points');
    const keyPoints = $('<p>').text('');
    const youTubeLink = response.youtube_link;
    let youTubeAppend = '';
    if (youTubeLink !== null) {
      youTubeAppend = $('<a>')
        .attr({ href: youTubeLink })
        .text('Watch This Book Being Read on YouTube');
    }
    const pubDate = $('<p>').text(response.pub_date);
    const isbn = $('<p>').text(response.isbn);
    const rowDiv = $('<div>')
      .attr({ class: 'row' })
      .css({ marginTop: '80px' });
    const bookInfo = $('<div>').attr({ class: 'col-sm-6' });
    const extendedBookInfo = $('<div>').attr({});
    // const bookCategories = $('<ul>');
    // const allCategories = response.categories
    // allCategories.forEach((cat)=>{
    // const bookCategory = $('<li>').text(cat);
    // $(bookCategories).append(bookCategory)
    // })
    $(bookInfo).append(bookTitle, bookSubtitle, bookAuthor, bookIllustrator);
    $(rowDiv).append(bookJpg, bookInfo);
    $(extendedBookInfo).append(
      bookDescriptionHeader,
      bookDescription,
      keyPointsHeader,
      keyPoints,
      youTubeAppend,
      // bookCategories,
      pubDate,
      // eslint-disable-next-line comma-dangle
      isbn
    );
    $('.modal-content').append(rowDiv, extendedBookInfo);
  });
};
