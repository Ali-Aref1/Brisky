var formData;

document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.querySelector('.login-box form');

  loginForm.addEventListener('submit', function (event) {
    formData = Object.fromEntries(new FormData(loginForm).entries());

    event.preventDefault();

    LoginUser();
  });

  var forgotPasswordLink = document.querySelector('.login-box a');

  forgotPasswordLink.addEventListener('click', function (event) {
    event.preventDefault();

    window.location.href = 'forgot-password.html';
  });
});

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function LoginUser() {
  // Assuming formData is defined elsewhere in your code

  fetch('/LoginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (!response.ok) {
        alert("Invalid email or password");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then(responseData => {
      const userId = responseData.userId; // Assuming the response has a userId property
      console.log(userId);
      sessionStorage.setItem('USER_ID', userId);

      // Set a cookie named 'user_id' with the userId value, expires in 7 days
      setCookie('user_id', userId, 7);

      // Redirect after setting sessionStorage and cookies
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors as needed
    });
}