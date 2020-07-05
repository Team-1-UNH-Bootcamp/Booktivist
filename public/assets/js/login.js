// login
// double check admin = true
$(document).ready(() => {
<<<<<<< HEAD
    // Getting references to our form and inputs
    const loginForm = $('form.login');
    const emailInput = $('input#email-input');
    const passwordInput = $('input#password-input');
=======
  // Getting references to our form and inputs
  const loginForm = $('.signup');
  const emailInput = $('#email');
  const passwordInput = $('#password');
>>>>>>> 1cb73584b36f6c64ff7ffdf63d4d3d02d1cb6b6e

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

<<<<<<< HEAD
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
=======
  // loginUser does a post to our "api/login" route and if successful,
  // redirects us the the members page
  const loginUser = (email, password) => {
    console.log(email, password);
    $.post('/api/login', {
      // eslint-disable-next-line object-shorthand
      email: email,
      // eslint-disable-next-line object-shorthand
      password: password,
    })
      .then(() => {
        window.location.replace('/');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log(err);
      });
  };
>>>>>>> 1cb73584b36f6c64ff7ffdf63d4d3d02d1cb6b6e
});
