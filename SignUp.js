document.addEventListener('DOMContentLoaded', function () {

    var signUpForm = document.querySelector('.signup-box form');

    
    signUpForm.addEventListener('submit', function (event) {
       
        event.preventDefault();

        
        window.location.href = 'Login.html';
    });
});