const form = document.getElementById('form');
const username = document.getElementById('username');
// const email = document.getElementById('email');
const password = document.getElementById('password');
// const password2 = document.getElementById('password2');
const apiURL = location.origin;

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function makeRequest(username, password) {
  var myHeaders = new Headers();

  var formdata = new FormData();
  formdata.append("username", username.value);
  formdata.append("password", password.value);

  var requestOptions = {
    method: 'POST',
    credentials: 'same-origin',
    body: formdata,
    redirect: 'follow'
};

fetch(apiURL+"/login", requestOptions)
  .then(response => {
    if(response.ok){
      statusMessage("Login Succeeded");
    }
    else{
      statusMessage("Login Failed")
      console.log(response);
    }
  })
  .catch(error => console.log('error', error));
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  makeRequest(username,password)

  // checkRequired([username, email, password, password2]);
  // checkLength(username, 3, 15);
  // checkLength(password, 6, 25);
  // checkEmail(email);
  // checkPasswordsMatch(password, password2);
});

function getAPI(){
  var myHeaders = new Headers();


  var requestOptions = {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
};

fetch(apiURL+"/api/users", requestOptions)
  .then(response => response.json())
  .then(data => appendData(data))
  .catch(error => console.log('error', error));

}
document.getElementById("get-api").addEventListener("click",function(){
  getAPI();
});

document.getElementById("logout").addEventListener("click",function(){
  logout();
});

function appendData(data){
  document.getElementById("api-data").innerHTML = JSON.stringify(data);
}

function statusMessage(msg){
  document.getElementById("login-success").innerHTML = msg;

}

function logout(){
  var requestOptions = {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
};

fetch(apiURL+"/logout", requestOptions)
  .then(response => {
    if(response.ok){
      statusMessage("Logged out");
    }
    else{
      console.log(response);
    }
  }
    )
  .catch(error => console.log('error', error));

}