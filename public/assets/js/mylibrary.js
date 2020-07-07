// check if user is logged in

// if logged in:
// $.ajax("/api/userbooks", {type: 'GET'}).then((response)=>
// {loop through response creating book cards})

// when book is clicked, launch book modal
// $.ajax("/api/books/${bookid}", {type: 'GET'}).then((response)=>{})

$(document).ready(() => {
  $.get('/api/user_data').then((data) => {
    console.log(data);
    $('.memberName').text(data.email);
  });
});
