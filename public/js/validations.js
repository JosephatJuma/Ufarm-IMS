//Regular Expression
const nameREGEX =
  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;
const emailREGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const phoneREGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const ninRegex = /^[A-Z0-9]{14}$/i;
function validFarmOneForm() {
  //Validate Name
  let name = document.forms["regForm"]["name"].value;
  let err = "";
  err = document.getElementById("nameErr");
  if (name == "") {
    err.textContent = "Name can't be empty";
    return false;
  } else {
    const validName = nameREGEX.test(name);
    if (!validName) {
      err.textContent = "Invalid name given";
      return false;
    }
    err.textContent = "";
  }
  //Validate date of registraion
  let regDate = document.forms["regForm"]["dor"].value;
  err = document.getElementById("dorErr");
  if (!regDate) {
    err.textContent = "Registraion date is needed";
    return false;
  }
  err.textContent = "";
  //Validate date of birth
  let birthDate = document.forms["regForm"]["dob"].value;
  err = document.getElementById("dobErr");
  if (!birthDate) {
    err.textContent = "Date of birth is needed";
    return false;
  }
  err.textContent = "";
  //Validate NIN number
  let nin = document.forms["regForm"]["nin"].value;
  err = document.getElementById("ninErr");
  if (!nin) {
    err.textContent = "NIN is required";
    return false;
  } else {
    const validNin = ninRegex.test(nin);
    if (!validNin) {
      err.textContent = "Invalid NIN provided";
      return false;
    }
    err.textContent = "";
  }
  //Validate phone number
  let phoneNumber = document.forms["regForm"]["phone"].value;
  err = document.getElementById("phoneErr");
  if (!phoneNumber) {
    err.textContent = "Phone number is required";
    return false;
  } else {
    const validPhone = phoneREGEX.test(phoneNumber);
    if (!validPhone) {
      err.textContent = "Invalid phone number provided";
      return false;
    }
    err.textContent = "";
  }
  //Validate address
  let address = document.forms["regForm"]["address"].value;
  err = document.getElementById("addressErr");
  if (!address) {
    err.textContent = "Farmer's address is required";
    return false;
  } else {
    err.textContent = "";
  }
  //Validate resdence type
  let residenceType = document.forms["regForm"]["residence"].value;
  err = document.getElementById("residenceErr");
  if (!residenceType) {
    err.textContent = "Farmer's residence type is required";
    return false;
  } else {
    err.textContent = "";
  }
  //Validate number or years
  let yearsOfStay = document.forms["regForm"]["years"].value;
  err = document.getElementById("yearErr");
  if (!yearsOfStay) {
    err.textContent = "You must provide years";
    return false;
  }
  if (yearsOfStay <= 10) {
    err.textContent =
      "The Farmer must have lived in the area for more than 10 years";
    return false;
  }
  err.textContent = "";
  return true;
}

function validUrbanFarmerForm() {
  let input;
  //Validate urban farmer Name
  let name = document.forms["regForm"]["name"].value;
  let err = "";
  input = document.getElementById("name");
  err = document.getElementById("nameErr");
  if (name == "") {
    err.textContent = "Name Can not be empty";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
    const validName = nameREGEX.test(name);
    if (!validName) {
      err.textContent = "Invalid name given";
      input.focus();
      input.style.borderColor = "red";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate date of registraion
  let regDate = document.forms["regForm"]["dor"].value;
  err = document.getElementById("dorErr");
  input = document.getElementById("dor");
  if (!regDate) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Registraion date is needed";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";
  //Validate date of birth
  let birthDate = document.forms["regForm"]["dob"].value;
  err = document.getElementById("dobErr");
  input = document.getElementById("dob");
  if (!birthDate) {
    err.textContent = "Date of birth is needed";
    input.focus();
    input.style.borderColor = "red";
    return false;
  }
  input.style.borderColor = "";
  err.textContent = "";
  //Validate NIN number
  let nin = document.forms["regForm"]["nin"].value;
  err = document.getElementById("ninErr");
  input = document.getElementById("nin");
  if (!nin) {
    err.textContent = "NIN is required";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
    const validNin = ninRegex.test(nin);
    if (!validNin) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Invalid NIN number provided";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "red";
  }
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
  if (email) {
    const validPhone = emailREGEX.test(email);
    if (!validPhone) {
      input.focus();
      input.style.borderColor = "red";
      err.textContent = "Invalid email address provided";
      return false;
    }
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
  return true;
}
