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
const modal = document.getElementById('simple-modal');
// get open modal button 
const modalBtn = document.getElementById('modal-btn')
// get closed btn
const closedBtn = document.getElementsByClassName('closed-btn')[0];

// listen for open click
modalBtn.addEventListener('click', openModal);
// listen for closed click
closedBtn.addEventListener('click', closedModal);
// Listen for outside click
window.addEventListener('click', clickOutside)


// function to open your modal
function openModal() {
    modal.style.display = 'block';

}
// function to close your modal
function closedModal() {
    modal.style.display = 'none';

}

// function to close your modal if outside click
function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }

}