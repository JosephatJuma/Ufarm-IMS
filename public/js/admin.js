const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;

const validateCredentailsForm = () => {
  let password = document.forms["credentials"]["password"].value;
  let passErr = document.getElementById("passErr");
  let confirm = document.forms["credentials"]["confirm"].value;
  let confirmErr = document.getElementById("confirmErr");
  let validPassword = passGEX.test(password);
  if (password === "") {
    alert("No password");
    passErr.textContent = "Password cannot be empty!";
    return false;
  } else if (validPassword !== true) {
    alert("set strong password");
    passErr.textContent = "";
    passErr.textContent =
      "Invalid password, password must be a combination of different characters!";
    return false;
  }

  if (confirm === "") {
    confirmErr.textContent = "You must confirm the password";
    return false;
  }
  if (confirm !== password) {
    confirmErr.textContent = "Passwords do not match";
    return false;
  }
  return true;
};
