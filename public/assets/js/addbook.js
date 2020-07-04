// click event - search ISBN
// ajax call to google books API
// return book info from first book
// take specifics and populate review form
// append to the dom, clear previous search
// two buttons - prev and next
// prev - clear dom and replace with ISBN search
// next - clear dom and replace with final info
// on submit, take all info from user and google books, set to obj
// and submit to backend

//     const isbnVal = ${"#"}.val().trim(),
//     titleVal: ${"#populateBook"}.val().trim(),
//     authorVal: ${"#populateAuthor"}.val().trim(),
//     illustratorVal: ${'populateIllustrator'}.val().trim(),
//     yearVal: ${'#populateDate'}.val().trim(),
//     descriptionVal: ${'#textarea'}.val().trim(),

//      TODO Need to change input type to select all
//      TODO need to determine what value is = to
//     categoriesVal: ${'#'}.val().trim(),
//     youtubeVal: ${#"addYouTube"}.val().trim(),
//     talkingPontsVal: ${'#talkingPoints'}.val().trim()

// const bookObj = {
//     isbn: isbnVal,
//     title: titleVal,
//     author: authorVal,
//     illustrator: illustratorVal,
//     year: yearVal,
//     description: descriptionVal,
//     categories: categoriesVal,
//     youtube: youtubeVal,
//     talkingPonts: talkingpointsVal,
// }

// $.ajax("/api/books", {type: 'POST', data: bookObj}).then(()=>{})
// add that to the books table and set added to false
// if (succesful) {display message saying booked added for approval},
// else if (book already exists){display book has already been added, it may be pending},
// else if(other err){display there was an error please try again later}
