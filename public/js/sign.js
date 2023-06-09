//Regular Expressions
const nameREGEX =
  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;
const emailREGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const phoneREGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const ninRegex = /^[A-Z0-9]{14}$/;

function validateUserForm() {
  let input;
  let err = "";
  //Validate Name
  let name = document.forms["regForm"]["name"].value;
  input = document.getElementById("name");
  err = document.getElementById("nameErr");
  if (name == "") {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Name can't be empty";
    return false;
  } else {
    const validName = nameREGEX.test(name);
    if (!validName) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Invalid name given";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate gender
  let gender = document.forms["regForm"]["gender"].value;
  input = document.getElementById("gender");
  err = document.getElementById("genderErr");
  if (!gender) {
    err.textContent = "Gender not selected";
    input.focus();
    input.style.borderColor = "red";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";

  //Validate date of birth
  let birthDate = document.forms["regForm"]["dob"].value;
  err = document.getElementById("dobErr");
  input = document.getElementById("dob");
  if (!birthDate) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Date of birth is needed";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";

  //Validate user address
  let address = document.forms["regForm"]["address"].value;
  err = document.getElementById("addressErr");
  input = document.getElementById("address");
  if (!address) {
    err.textContent = "Address is required";
    input.focus();
    input.style.borderColor = "red";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";
  //Validate phone number
  let phoneNumber = document.forms["regForm"]["phone"].value;
  input = document.getElementById("phone");
  err = document.getElementById("phoneErr");
  if (!phoneNumber) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Phone number is required";
    return false;
  } else {
    const validPhone = phoneREGEX.test(phoneNumber);
    if (!validPhone) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Invalid phone number provided";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate email number
  let email = document.forms["regForm"]["email"].value;
  err = document.getElementById("emailErr");
  input = document.getElementById("email");
  if (!email) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Email is needed";
    return false;
  }
  if (email) {
    const validPhone = emailREGEX.test(email);
    if (!validPhone) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Invalid email address provided";
      return false;
    }
  }
  err.textContent = "";
  input.style.borderColor = "";
  //Validate Password
  let password = document.forms["regForm"]["password"].value;
  let confirmPassword = document.forms["regForm"]["confirm"].value;
  input = document.getElementById("password");
  err = document.getElementById("passwordErr");

  if (!password) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Password is required";
    return false;
  } else {
    err.textContent = "";
    input.style.borderColor = "";
    const validPassword = passGEX.test(password);
    if (!validPassword) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent =
        "Password must have atleast 1 uppercase, 1 lowercase letter, number, and speacial characters";
      return false;
    } else if (!confirmPassword) {
      err.textContent = "";
      input.style.borderColor = "";
      input = document.getElementById("confirm");
      err = document.getElementById("confirmErr");
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "You must confirm password";
      return false;
    } else if (confirmPassword !== password) {
      err.textContent = "";
      input.style.borderColor = "";
      input = document.getElementById("confirm");
      err = document.getElementById("confirmErr");
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Passwords do not match";
      return false;
    }
  }
  err.textContent = "";
  input.style.borderColor = "";
  return true;
}

const toggleShowPassword = () => {
  const passwordInput = document.getElementById("password");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  let icon =
    type === "password"
      ? '<i class= "bi bi-eye"/>'
      : '<i class= "bi bi-eye-slash"/>';
  document.getElementById("show").innerHTML = icon;
};

const toggleHide = () => {
  const confirmPassword = document.getElementById("confirm");
  const type =
    confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);
  const icon =
    type === "password"
      ? '<i class="bi bi-eye"/>'
      : '<i class="bi bi-eye-slash"/>';
  document.getElementById("hide").innerHTML = icon;
};

//hide alert message
const hideAlert = () => {
  document.getElementById("error").innerHTML = "";
};

function validateLoginForm() {
  let id = document.forms["form"]["id"].value;
  //let input = document.getElementById('id');
  let err = document.getElementById("idErr");
  let password = document.forms["form"]["password"].value;
  let idInput = document.getElementById("id");
  let passInput = document.getElementById("password");
  //let err = document.getElementById("passwordErr");
  if (id == "") {
    err.textContent = "Id must be given";
    idInput.style.borderColor = "red";
    return false;
  } else if (password === "") {
    err = document.getElementById("passwordErr");
    err.textContent = "Password can't be empty";
    passInput.style.borderColor = "red";
    return false;
  } else {
    err.textContent = "";
    err.style.color = "";
  }
  document.getElementById("loader").innerHTML =
    '<div class="d-flex.justify-content-center"><div class="spinner-border.text-success" role="status" ></div></div>';
  return true;
}
