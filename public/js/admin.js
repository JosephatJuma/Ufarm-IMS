const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;

function validateCredentailsForm() {
  document.getElementById("error").style.display = "none";
  let input;
  let password = document.forms["credentials"]["password"].value;
  let confirm = document.forms["credentials"]["confirm"].value;
  let err = "";
  input = document.getElementById("password");
  err = document.getElementById("passErr");
  input.style.borderColor = "";
  if (password == "") {
    input.style.borderColor = "red";
    err.textContent = "Password can't be empty!";
    document.getElementById("error").style.display = "block";
    return false;
  } else if (passGEX.test(password) !== true) {
    document.getElementById("error").style.display = "block";
    input.style.borderColor = "red";
    err.textContent =
      "Password must be a combination of different character and must be atleast 8 character long!";
    return false;
  }
  input = document.forms["credentials"]["confirm"];
  if (confirm == "") {
    input.style.borderColor = "red";
    document.getElementById("error").style.display = "block";
    err.textContent = "You must confirm password!";
    return false;
  } else if (confirm !== password) {
    document.getElementById("error").style.display = "block";
    input.style.borderColor = "red";
    err.textContent = "Passwords do not match!";
    return false;
  } else {
    document.getElementById("error").style.display = "none";
    err.textContent = "";
  }
  return true;
}
function hideError() {
  let error = document.getElementById("error");
  error.style.display = "none";
}
