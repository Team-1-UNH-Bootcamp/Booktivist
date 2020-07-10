// login
// double check admin = true
$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('.signup');
  const emailInput = $('#email');
  const passwordInput = $('#password');

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const adminData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };
    console.log(adminData);
    if (!adminData.email || !adminData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    // eslint-disable-next-line no-use-before-define
    loginAdminUser(adminData.email, adminData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful,
  // redirects us the the members page
  const loginAdminUser = (email, password) => {
    $.post('/api/admin/login', {
      // eslint-disable-next-line object-shorthand
      email: email,
      // eslint-disable-next-line object-shorthand
      password: password,
    })
      .then(() => {
        window.location.replace('/admin/review');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };
});
