document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.querySelector(".login-box form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    window.location.href = "index.html";
  });

  var forgotPasswordLink = document.querySelector(".login-box a");

  forgotPasswordLink.addEventListener("click", function (event) {
    event.preventDefault();

    window.location.href = "forgot-password.html";
  });
});
