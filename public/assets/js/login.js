// check if user's logged in - passport

// $('#loginButton').click(() => {
//   const userData = [
//     {
//       username: $('#userNameInput').val(),
//       password: $('#passwordInput').val(),
//     },
//   ];
// $.ajax('/api/user_data', {
//  type: 'POST',
//  data: 'userData'
// }).then((response)=>{
//  if response === ""{didn't work}
// else {logged in and go to home page, logged in status set to true}
// })
// });

// login
// double check admin = true
$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    // eslint-disable-next-line no-use-before-define
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful,
  // redirects us the the members page
  const loginUser = (email, password) => {
    $.post('/api/login', {
      // eslint-disable-next-line object-shorthand
      email: email,
      // eslint-disable-next-line object-shorthand
      password: password,
    })
      .then(() => {
        window.location.replace('/members');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
