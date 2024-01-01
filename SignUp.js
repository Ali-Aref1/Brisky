var formData;

document.addEventListener('DOMContentLoaded', function () {
  var signUpForm = document.querySelector('.signup-box form');

  signUpForm.addEventListener('submit', function (event) {
    event.preventDefault();
    formData = Object.fromEntries(new FormData(signUpForm).entries());
    console.log(formData);
    SignUpUser();
  });
});

async function SignUpUser() {
  fetch('/SignUpUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(handleResponse)
  .then(handleData)
  .catch(handleError);
}

function handleResponse(response) {
  const contentType = response.headers.get('Content-Type');
  
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    window.location.replace('/Login'); // Redirect if not JSON
    return Promise.reject('Redirecting...');
  }
}

function handleData(data) {
  if (data.success) {
    // Successful registration
  } else {
    // Error occurred
    alert(data.message);
    console.log("User Already Exists!");
  }
}

function handleError(error) {
  console.error('Error:', error);
}