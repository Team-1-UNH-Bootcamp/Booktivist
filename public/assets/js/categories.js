/* eslint-disable func-names */
// onload ->
const response = [
  {
    id: 0,
    img:
      './assets/images/bookcovers/Newly Published Books/anti racist baby.png',
    title: 'Antiracist Baby',
    author: 'Ibram X. Kendi',
    description: '0 this is a book',
  },
  {
    id: 1,
    img:
      './assets/images/bookcovers/Newly Published Books/anti racist baby.png',
    title: 'Antiracist Baby',
    author: 'Ibram X. Kendi',
    description: '1 this is a book',
  },
  {
    id: 2,
    img:
      './assets/images/bookcovers/Newly Published Books/anti racist baby.png',
    title: 'Antiracist Baby',
    author: 'Ibram X. Kendi',
    description: '2 this is a book',
  },
  {
    id: 3,
    img:
      './assets/images/bookcovers/Newly Published Books/anti racist baby.png',
    title: 'Antiracist Baby',
    author: 'Ibram X. Kendi',
    description: '3 this is a book',
  },
];
$(document).ready(() => {
  const catUrl = window.location.href;
  const key = catUrl.slice(catUrl.indexOf('=') + 1, catUrl.length);
  console.log(key);

  // $.ajax('/api/bycategory/${key}', {
  //   type: 'GET',
  // }).then((response) => {
  //   console.log(response);
  // response.forEach((data)=>{
  response.forEach((data) => {
    console.log('hello!');
    const parentDiv = $('<div>').attr({ class: 'col-lg-3 col-sm-12' });
    const cardDiv = $('<div>').attr({ class: 'card' });
    const cardImg = $('<img>').attr({
      class: 'card-img-top',
      src: data.img,
      alt: 'Card Img Top',
    });
    const cardBody = $('<div>')
      .attr({ class: 'card-body' })
      .css({ paddingLeft: '5px', paddingRight: '5px', paddingBotton: '10px' });
    const linkTitle = $('<button>')
      .attr({ class: 'titleModal', value: data.id })
      // value: data.id
      .attr('data-toggle', 'modal')
      .attr('data-target', '#bookModal')
      .css({ border: 'none', backgroundColor: 'white' });
    const bookTitle = $('<h3>')
      .attr({ class: 'card-title' })
      .text(data.title);
    const bookAuthor = $('<h4>')
      .attr({ class: 'card-subtitle' })
      .text(data.author);

    $(linkTitle).append(bookTitle, bookAuthor);
    $(cardBody).append(linkTitle);
    $(cardDiv).append(cardImg, cardBody);
    $(parentDiv).append(cardDiv);
    // TODO create byCategory id div
    $('#byCategory').append(parentDiv);

    // $(`#${category}`).append(parentDiv);
  });
  // };

  // eslint-disable-next-line space-before-function-paren
  $('.titleModal').click(function() {
    const i = this.value;
    // $.ajax(`/api/books/${this.value}`, {type: 'GET'}).then(()=>{})
    console.log(i);
    $('.modal-content').text('');
    const rowDiv = $('<div>').attr({ class: 'row' });
    const bookTitle = $('<h5>').text(`TITLE: ${response[i].title}`);
    const bookJpg = $('<img>').attr({
      src: response[i].img,
      class: 'col-sm-4',
    });
    const bookAuthor = $('<h6>').text(
      // eslint-disable-next-line comma-dangle
      `AUTHOR: ${response[i].author}`
    );
    const extendedBookInfo = $('<div>').attr({});
    const bookDescriptionHeader = $('<h6>').text('Description:');
    const bookDescription = $('<p>')
      .text(response[i].description)
      .attr({ id: 'bookDesc' });
    $(extendedBookInfo).append(bookDescriptionHeader, bookDescription);

    const bookInfo = $('<div>').attr({ class: 'col-sm-6' });
    $(bookInfo).append(bookTitle, bookAuthor);
    $(rowDiv).append(bookJpg, bookInfo);
    $('.modal-content').append(rowDiv, extendedBookInfo);
  });
});

// eslint-disable-next-line no-plusplus

// const getUrlVars = () => {
//   const categoryName = [], hash;
//   const hashes = window.location.href
//     .slice(window.location.href(indexOf('?') + 1))
//     .split('&');
//   for (const i = 0; i < hashes.length; i++) {
//    const hash = hashes[i].split('=');
//     vars.push(hash[0]);
//     vars[hash[0]] = hash[1];
//   }
//   console.log(categoryName);
//   return categoryName;
// };
// $(document).ready(() => {
//   // Code to extract category name from URL
//   getUrlVars();
//   const catPar = $('<p>').text('categoryName');
//   $('#catPar').append(catPar);
// });

//
// $.ajax('/api/bycategory/${getUrlVars}', {
//   type: 'GET',
// }).then((response) => {
//   console.log(response);
// response.forEach((data)=>{
// const cardDiv = $('<div>').attr({class: 'card modalCard', id: data.id});
// const coverJpg =
// $('<img>').attr({class: 'card-img-top', src: data.img, id: 'bookModal' to modal});
//
// const cardBody = $('<div>').attr({class: 'card-body'});
// const titleHeader = $('<h5>').attr({class: "card-title", id: "titleHeader", to modal})
// .text(data.title);
//
// const author = ${'<h6>'}.attr({id: 'authorHeader'}).text(data.author);
// $(cardDiv).append(coverJpg, cardBody, titleHeader, author);
// $('.content').append(cardDiv);
// })
// });

// each card gets preset id
// this id will reference a function on script.js, which will launch the modal
// and propogate information from table
