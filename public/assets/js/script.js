/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
// recently published books - books published in the last month

// eslint-disable-next-line arrow-body-style
const getBooks = (category) => {
  return new Promise((resolve, reject) => {
    $.ajax(`/api/books/${category[0]}`, { type: 'GET' })
      .then((response) => {
        response.forEach((data) => {
          let apiTitle = 'title';
          let apiId = 'id';
          let apiAuthor = 'author';
          // let apiImg = 'image_link';
          if (category[0] !== 'recent') {
            apiTitle = 'books.title';
            apiId = 'books.id';
            apiAuthor = 'books.author';
            // apiImg = 'books.image_link';
          }

          const parentDiv = $('<div>').attr({ class: 'col-lg-3 col-sm-12' });
          const cardDiv = $('<div>').attr({ class: 'card' });
          // const cardImg = $('<img>').attr({
          //   class: 'card-img-top',
          //   src: data[apiImg],
          //   alt: 'Card Img Top',
          // });
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
          console.log(linkTitle[0].value);
          const bookTitle = $('<h3>')
            .attr({ class: 'card-title' })
            .text(data[apiTitle]);
          const bookAuthor = $('<h4>')
            .attr({ class: 'card-subtitle' })
            .text(data[apiAuthor]);

          $(linkTitle).append(bookTitle, bookAuthor);
          $(cardBody).append(linkTitle);
          $(cardDiv).append(cardBody);
          // cardImg,
          $(parentDiv).append(cardDiv);

          $(`#${category[1]}`).append(parentDiv);
          resolve(response);
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const getModal = () => {
  console.log('123');
  // eslint-disable-next-line space-before-function-paren
  $('.titleModal').click(function() {
    console.log('hello!');
    const i = this.value;
    console.log(i);
    $.ajax(`/api/book/${i}`, { type: 'GET' }).then((response) => {
      console.log(response);
      console.log(response.title);

      $('.modal-content').text('');
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

const recent = ['recent', 'recent'];
const BLM = ['category/3', 'BLM'];
const LGBTQ = ['category/1', 'LGBTQ'];
// const NAH = 'category/2';
const loadBooks = () => {
  $.when(getBooks(recent), getBooks(BLM), getBooks(LGBTQ)).then(() => {
    getModal();
  });
};

loadBooks();

$('#button-addon1').click(function(event) {
  event.preventDefault();
});

//
//          $("#plusSign").click(function()=>{
//          if(${"#plusSign"}.value === false){
//              $.ajax(`/api/userBooks/${bookId}`, {type: 'POST'}).then(()=>{
//              display message that book has been added
//                 change to minus sign
//             } else {
//              $.ajax(`api/userBooks/${bookId}`. {type: 'DESTROy'}).then(()=>{
//                  display message book has been removed from list
//                  change minus sign to plus sign
// })
// }
// })
