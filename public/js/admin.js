const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;

function validateCredentailsForm() {
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
    return false;
  } else if (passGEX.test(password) !== true) {
    input.style.borderColor = "red";
    err.textContent =
      "Password must be a combination of different character and must be atleast 8 character long!";
    return false;
  }
  input = document.forms["credentials"]["confirm"];
  if (confirm == "") {
    input.style.borderColor = "red";
    err.textContent = "You must confirm password!";
    return false;
  } else if (confirm !== password) {
    input.style.borderColor = "red";
    err.textContent = "Passwords do not match!";
    return false;
  } else {
    err.textContent = "";
  }
  return true;
}
