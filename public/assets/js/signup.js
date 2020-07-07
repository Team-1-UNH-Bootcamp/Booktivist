// get input info
// POST
// signupData
// then redirect to homepage
// passport

$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('.signup');
  const firstNameInput = $('#first-name');
  const lastNameInput = $('#last-name');
  const emailInput = $('#email');
  const passwordInput = $('#password');

  // When the signup button is clicked, we validate the email and password are not blank
  // eslint-disable-next-line consistent-return
  signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    console.log(userData);

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password
    ) {
      return 'Please enter values';
    }
    // If we have an email and password, run the signUpUser function
    // eslint-disable-next-line no-use-before-define
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password
    );
    firstNameInput.val('');
    lastNameInput.val('');
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, email, password) {
    console.log(firstName);
    $.post('/api/signup', {
      firstName,
      lastName,
      email,
      password,
    })
      .then((data) => {
        console.log(data);
        window.location.replace('/login');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      // eslint-disable-next-line no-use-before-define
      .catch(handleLoginErr);
  }

  const handleLoginErr = (err) => {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  };
});
