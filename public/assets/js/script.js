// recently published books - books published in the last month
// $.ajax('/api/books/recentpub', {type: 'GET'}).then((response)=>
// {take the response and apply to the homepage})
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

// $("bookImgBtn").click(()=>{
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
