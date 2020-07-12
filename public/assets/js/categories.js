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

            const parentDiv = $('<div>').attr({
              class: 'col-lg-3 col-sm-12 bookParentDiv',
            });
            const cardDiv = $('<div>').attr({ class: 'card bookCardDiv' });
            const cardImg = $('<img>').attr({
              class: 'card-img-top bookCardImage',
              src: data[apiImg],
              alt: 'Card Img Top',
            });
            const cardBody = $('<div>')
              .attr({ class: 'card-body bookCardBody' })
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

const notLoggedIn = () => {
  console.log('not logged in');
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
        src: response.image_link,
        class: 'col-sm-4 modalCoverJpg bookInfoChild',
      });
      const bookTitle = $('<h5>')
        .attr({ class: 'modalBookTitle bookInfoChild' })
        .text(
          // eslint-disable-next-line comma-dangle
          `TITLE: ${response.title}`
        );
      const bookSubtitle = $('<h6>')
        .attr({ class: 'modalBooksubTitle bookInfoChild' })
        .text('');
      const bookAuthor = $('<h6>')
        .attr({ class: 'modalBookAuthor bookInfoChild' })
        .text(
          // eslint-disable-next-line comma-dangle
          `AUTHOR: ${response.author}`
        );
      const bookIllustrator = $('<h6>')
        .attr({ class: 'modalBookIllustrator bookInfoChild' })
        .text(`illustrator: ${response.illustrator}`);
      const bookDescriptionHeader = $('<h6>')
        .attr({ class: 'descriptionHeader extBookChild' })
        .text('Description:');
      const bookDescription = $('<p>')
        .text(response.description)
        .attr({ id: 'bookDesc extBookChild' });
      const keyPointsHeader = $('<h6>')
        .text('Key Discussion Points')
        .attr({ class: 'keyPointsHeader extBookChild' });
      const keyPoints = $('<p>')
        .text('')
        .attr({ class: 'keyPoints extBookChild' });
      const youTubeLink = response.youtube_link;
      let youTubeAppend = '';
      if (youTubeLink !== null) {
        youTubeAppend = $('<a>')
          .attr({ href: youTubeLink, class: 'youTubeLink extBookChild' })
          .text('Watch This Book Being Read on YouTube');
      }
      const pubDate = $('<p>')
        .text(response.pub_date)
        .attr({ class: 'pubDate extBookChild' });
      const isbn = $('<p>')
        .text(response.isbn)
        .attr({ class: 'isbn extBookChild' });

      const rowDiv = $('<div>')
        .attr({ class: 'row rowDiv' })
        .css({ marginTop: '80px' });
      const bookInfo = $('<div>').attr({ class: 'col-sm-6 modalBookInfo' });
      const extendedBookInfo = $('<div>').attr({ class: 'extendedInfo' });
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
