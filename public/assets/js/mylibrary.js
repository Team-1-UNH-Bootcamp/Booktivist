// check if user is logged in

// if logged in:
// $.ajax("/api/userbooks", {type: 'GET'}).then((response)=>
// {loop through response creating book cards})

// when book is clicked, launch book modal
// $.ajax("/api/books/${bookid}", {type: 'GET'}).then((response)=>{})

$(document).ready(() => {
  $.get('/api/user_data').then((data) => {
    $('.memberName').text(data.email);
  });

  $.ajax('/mylibrary', { type: 'GET' }).then((response) => {
    console.log(response);
  });
});

// TODO set up rows in mylibrary.html
// $.ajax("/api/books/${bookid}", {type: 'GET'}).then((response)=>{
// respone.forEach((data)=>{
// const bookCard = $('<card>').attr({id: 'data.id', class: 'col-sm-2'});

// get design for book card from index.html
// const bookTitle = $('<h2>').attr().text(data.title);
// const bookAuthor = $('<h2>').attr().text(data.author);
// const bookjpg = $('<img>').attr({src: data.img, class: 'btn', href: `/api/books/${data.id}`});
// append all
// })
// })
