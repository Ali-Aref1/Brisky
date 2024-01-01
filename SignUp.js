document.addEventListener('DOMContentLoaded', function () {

    var signUpForm = document.querySelector('.signup-box form');

    
    signUpForm.addEventListener('submit', function (event) {
       


        
        window.location.href = 'Login';
    });
});
fetch('/SignUpUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // if Successful registration
      window.location.href = '/Login.html';
    } else {
      // Error occurred
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);

  });
