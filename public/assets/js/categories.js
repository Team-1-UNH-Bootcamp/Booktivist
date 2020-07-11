/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */
// onload ->
$(document).ready(() => {
  const catUrl = window.location.href;
  console.log(catUrl.length);
  if (catUrl.length > 40) {
    const key = catUrl.slice(catUrl.indexOf('?') + 1, catUrl.indexOf('='));
    let urlPath = '';
    let keyValue = catUrl.slice(catUrl.indexOf('=') + 1, catUrl.indexOf('+'));
    const urlCategory = catUrl
      .slice(catUrl.indexOf('+') + 1, catUrl.length)
      .replace(/&/g, ' ');

    if (key === 'search') {
      keyValue = catUrl.slice(catUrl.indexOf('=') + 1, catUrl.length);
      urlPath = key;
      const searchCriteria = keyValue.toUpperCase().replace(/&/g, ' ');
      // eslint-disable-next-line no-use-before-define
      $.when(getBooksbyCat(urlPath, keyValue, searchCriteria, false)).then(
        () => {
          // eslint-disable-next-line no-use-before-define
          getModal();
        }
      );
    } else {
      urlPath = `books/${key}`;
      // eslint-disable-next-line no-use-before-define
      $.when(getBooksbyCat(urlPath, keyValue, urlCategory, true)).then(() => {
        // eslint-disable-next-line no-use-before-define
        getModal();
      });
    }
  }
});

// eslint-disable-next-line prefer-arrow-callback
$('#bookCategorySelect').change(function() {
  const index = this.value;
  const bookId = this.options[index].id;
  const catHeader = this.options[index].text;
  const urlHeader = catHeader.replace(/ /g, '&');

  // eslint-disable-next-line prefer-arrow-callback
  $('#submitCategory').click(function(event) {
    event.preventDefault();
    window.location.href = `/categories/?category=${bookId}+${urlHeader}`;
  });
});

// eslint-disable-next-line arrow-body-style
// path 1 - middle part of route
// path 2 - id
// path 3 - header to display
// isbook - boolean true for category searches
const getBooksbyCat = (path1, path2, path3, isBook) => {
  return new Promise((resolve, reject) => {
    $.ajax(`/api/${path1}/${path2}`, {
      type: 'GET',
    })
      .then((response) => {
        if (response.length === 0) {
          $('#categoryHeader').text(
            'Sorry! We could not find anything that matches your search.'
          );
        } else {
          response.forEach((data) => {
            let apiTitle = 'books.title';
            let apiId = 'books.id';
            let apiAuthor = 'books.author';
            let apiImg = 'books.image_link';
            if (isBook === false) {
              apiTitle = 'title';
              apiId = 'id';
              apiAuthor = 'author';
              apiImg = 'image_link';
            }
            // apiImg = 'books.image_link';

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
              .css({ border: 'none', backgroundColor: 'white', width: '100%' });
            const bookTitle = $('<h3>')
              .attr({ class: 'card-title' })
              .text(data[apiTitle])
              .css({ width: '100%', border: 'none' });
            const bookAuthor = $('<h4>')
              .attr({ class: 'card-subtitle' })
              .text(data[apiAuthor]);

            $(linkTitle).append(bookTitle, bookAuthor);
            $(cardBody).append(linkTitle);
            $(cardDiv).append(cardImg, cardBody);
            $(parentDiv).append(cardDiv);

            $('#cardDiv').append(parentDiv);
            $('#categoryHeader').text(path3);
            resolve(response);
          });
        }
      })
      .catch((err) => {
        $('#categoryHeader').text(
          'We experienced an error with your search. Please try a different category.'
        );
        $('#cardDiv').empty();

        reject(err);
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

const getModal = () => {
  // eslint-disable-next-line space-before-function-paren
  $('.titleModal').click(function() {
    $('.modal-content').text('');
    const i = this.value;
    console.log(i);
    $.ajax('/api/user_data', { type: 'GET' }).then((userData) => {
      if (userData.message === false) {
        console.log(userData);
        notLoggedIn();
      } else {
        $.ajax(`/api/mylibrary/${i}`, { type: 'GET' }).then((isAdded) => {
          if (isAdded === null) {
            console.log('notAdded');
            addBookToLibrary(i);
          } else {
            console.log('added');
            removeBookFromLibrary(i);
          }
        });
      }
    });

    $.ajax(`/api/book/${i}`, { type: 'GET' }).then((response) => {
      console.log(response);
      console.log(response.title);

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
  });
};
