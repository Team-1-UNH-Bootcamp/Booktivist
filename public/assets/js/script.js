/* eslint-disable func-names */
// recently published books - books published in the last month

const getBooks = (category) => {
  $.ajax(`/api/books/${category[0]}`, { type: 'GET' }).then((response) => {
    response.forEach((data) => {
      console.log(data);
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
      $(parentDiv).append(cardDiv);

      $(`#${category[1]}`).append(parentDiv);
    });
    // eslint-disable-next-line comma-dangle
  });
};
// const recent = ['recent', 'recent'];
const BLM = ['category/3', 'BLM'];
const LGBTQ = ['category/1', 'LGBTQ'];
// const NAH = 'category/2';
// getBooks(recent);
getBooks(BLM);
getBooks(LGBTQ);
// getBooks(NAH);

// eslint-disable-next-line space-before-function-paren
// $('.titleModal').click(function() {
//   const i = this.value;
//   // $.ajax(`/api/books/${this.value}`, {type: 'GET'}).then(()=>{})
//   console.log(i);
//   // $.ajax call.then(()=>{});
//   $('.modal-content').text('');
//   const bookJpg = $('<img>').attr({
//     src: response[i].img,
//     class: 'col-sm-4',
//   });
//   const bookTitle = $('<h5>').text(
//     // eslint-disable-next-line comma-dangle
//     `TITLE: ${response[i].title}`
//   );
//   const bookSubtitle = $('<h6>').text('');
//   const bookAuthor = $('<h6>').text(
//     // eslint-disable-next-line comma-dangle
//     `AUTHOR: ${response[i].author}`
//   );
//   const bookIllustrator = $('<h6>').text('');
//   const bookDescriptionHeader = $('<h6>').text('Description:');
//   const bookDescription = $('<p>')
//     .text(response[i].description)
//     .attr({ id: 'bookDesc' });

//   const keyPointsHeader = $('<h6>').text('Key Discussion Points');
//   const keyPoints = $('<p>').text('');
//   // const youTubeLink = response.youTubeLink;
//   // change below to let
//   const youTubeAppend = '';
//   // if (youTubeLink !== null) {
//   //   youTubeAppend = $('<a>')
//   //     .attr({ href: '*' })
//   //     .text('Watch This Book Being Read on YouTube');
//   // }
//   const pubDate = $('<p>').text('');
//   const isbn = $('<p>').text('');

//   const rowDiv = $('<div>')
//     .attr({ class: 'row' })
//     .css({ marginTop: '80px' });
//   const bookInfo = $('<div>').attr({ class: 'col-sm-6' });
//   const extendedBookInfo = $('<div>').attr({});
//   const bookCategories = $('<ul>');
//   // const allCategories = response.categories
//   // allCategories.forEach((cat)=>{
//   // const bookCategory = $('<li>').text(cat);
//   // $(bookCategories).append(bookCategory)
//   // })

//   $(bookInfo).append(bookTitle, bookSubtitle, bookAuthor, bookIllustrator);
//   $(rowDiv).append(bookJpg, bookInfo);
//   $(extendedBookInfo).append(
//     bookDescriptionHeader,
//     bookDescription,
//     keyPointsHeader,
//     keyPoints,
//     youTubeAppend,
//     bookCategories,
//     pubDate,
//     // eslint-disable-next-line comma-dangle
//     isbn
//   );
//   $('.modal-content').append(rowDiv, extendedBookInfo);
// });
// console.log('1-hola!');
// $.ajax('/api/books/recent', { type: 'GET' }).then((apirep) => {
//   console.log(apirep);
//   console.log('hola!');
// });

// })
// query limit - 5

// for black lives matter
// $.ajax('/api/bycategory/blacklivesmatter', {type: 'GET'}).then((response)=>
// {take response and apply to homepage})

// for LGBTQIA+
// $.ajax('/api/bycategory/LGBTQIA', {type: 'GET'}).then((response)=>
// {take response and apply to homepage})

// for Native American Heritage
// $.ajax('/api/bycategory/nativeamericanheritage', {type: 'GET'}).then((response)=>
// {take response and apply to homepage})

// populate book modal
// GET /api/books/${bookid}
// response -> populate book modal
// populate book models with latest books by publication date
// give book modal id = to book id

// allow user to add to my library or opt out
// in book modal
// if user click on plus sign (+) to add a book
// into the my library, check if user is logged in or not
// if not redirect to signup page or login page

// if yes then book will be added to user's my library

// if yes then book will be added to user's my library

// when plus is clicked and user is logged in
// POST
// $.ajax("/api/userbooks/${bookid}", {type: 'POST'}).then(()=>
// this title will be added to this users "userbooks"
// {
// on return of confirmation, tell user it got added
// switch plus to minus
// })

// $('.modalCard').click(()=>{
// $.ajax(`/api/books/${this.id}, {
//      type: 'GET'
// }).then((response)=>{
//    dynamically create modal
//      Nested call to see if book has been added
//      1. check if logged in
//      2. if logged in:
//      $.ajax(`/api/userbooks/${this.id}`, {
//          type: 'GET'
// }).then((response)=>{
//      if(response === true){
//         display minus sign
// })
// } else{display plus sign}
// })
// })
// })
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
