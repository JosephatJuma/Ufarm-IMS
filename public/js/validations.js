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

function validFarmOneForm() {
  let input;
  let alert = "";
  document.getElementById("errAlert").innerHTML = alert;
  //Validate Name
  let name = document.forms["regForm"]["name"].value;
  let err = "";
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
  //Validate Ward
  let ward = document.forms["regForm"]["ward"].value;
  input = document.getElementById("ward");
  err = document.getElementById("wardErr");
  if (!ward) {
    err.textContent = "Farmer one's ward not selected";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
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
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate date of registraion
  let regDate = document.forms["regForm"]["dor"].value;
  err = document.getElementById("dorErr");
  input = document.getElementById("dor");
  if (!regDate) {
    err.textContent = "Registraion date is needed";
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
  //Validate activity
  let activity = document.forms["regForm"]["activity"].value;
  input = document.getElementById("activity");
  err = document.getElementById("activityErr");
  if (!activity) {
    err.textContent = "Activity not selected";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
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
      err.textContent = "Invalid NIN provided";
      input.focus();
      input.style.borderColor = "red";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate phone number
  let phoneNumber = document.forms["regForm"]["phone"].value;
  err = document.getElementById("phoneErr");
  input = document.getElementById("phone");
  if (!phoneNumber) {
    err.textContent = "Phone number is required";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
    const validPhone = phoneREGEX.test(phoneNumber);
    if (!validPhone) {
      err.textContent = "Invalid phone number provided";
      input.focus();
      input.style.borderColor = "red";
      return false;
    }
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate address
  let address = document.forms["regForm"]["address"].value;
  err = document.getElementById("addressErr");
  input = document.getElementById("address");
  if (!address) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Farmer's address is required";
    return false;
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate resdence type
  let residenceType = document.forms["regForm"]["residence"].value;
  err = document.getElementById("residenceErr");
  input = document.getElementById("residence");
  if (!residenceType) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Farmer's residence type is required";
    return false;
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
  //Validate number or years
  let yearsOfStay = document.forms["regForm"]["years"].value;
  err = document.getElementById("yearErr");
  input = document.getElementById("years");
  if (!yearsOfStay) {
    err.textContent = "You must provide years";
    input.focus();
    input.style.borderColor = "red";
    return false;
  }
  if (yearsOfStay <= 10) {
    // input.focus();
    // input.style.borderColor = "red";
    //err.textContent = "Years must be more than 10";
    alert = `<div class="alert bg-danger alert-dismissible show " role="alert" fade style="display:flex;justify-content:space-between;">
                  <p class="text-white"> <strong>Alert: </strong> The Farmer must have lived in the area for more than 10 years!</strong></p>
                  <button class="btn text-white" type="button" onclick="return hideAlert()">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div>`;
    document.getElementById("errAlert").innerHTML = alert;
    err.textContent = "";
    input.style.borderColor = "";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";
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
  //Validate gender
  let gender = document.forms["regForm"]["gender"].value;
  input = document.getElementById("gender");
  err = document.getElementById("genderErr");
  if (!gender) {
    err.textContent = "Gender not selected";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
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
  } else {
    input.style.borderColor = "";
    err.textContent = "";
  }

  //Validate activity
  let activity = document.forms["regForm"]["activity"].value;
  input = document.getElementById("activity");
  err = document.getElementById("activityErr");
  if (!activity) {
    err.textContent = "Activity not selected";
    input.focus();
    input.style.borderColor = "red";
    return false;
  } else {
    err.textContent = "";
    input.style.borderColor = "";
  }
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
    input.style.borderColor = "";
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

//validate add product form
function validateProduct() {
  let input;
  let err;
  //validate product name
  let name = document.forms["regForm"]["product_name"].value;
  err = document.getElementById("nameErr");
  input = document.getElementById("product_name");
  if (!name) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Product name is required!";
    return false;
  }
  //validate payment mode
  err.textContent = "";
  input.style.borderColor = "";
  let payment_mode = document.forms["regForm"]["payment_mode"].value;
  err = document.getElementById("paymentErr");
  input = document.getElementById("payment_mode");
  if (!payment_mode) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Payment mode must be specified!";
    return false;
  }
  //validate date
  err.textContent = "";
  input.style.borderColor = "";
  let date = document.forms["regForm"]["date"].value;
  err = document.getElementById("dateErr");
  input = document.getElementById("date");
  if (!date) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Please pick the date!";
    return false;
  }
  //validate unit price
  err.textContent = "";
  input.style.borderColor = "";
  let unit_price = document.forms["regForm"]["unit_price"].value;
  err = document.getElementById("priceErr");
  input = document.getElementById("unit_price");
  if (!unit_price) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Please set the unit price for the product!";
    return false;
  }
  //validate delivery mode
  err.textContent = "";
  input.style.borderColor = "";
  let delivery_mode = document.forms["regForm"]["delivery_mode"].value;
  err = document.getElementById("deliveryErr");
  input = document.getElementById("delivery_mode");
  if (!delivery_mode) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Please set the unit price for the product!";
    return false;
  }
  //validate quantity
  err.textContent = "";
  input.style.borderColor = "";
  let quantity = document.forms["regForm"]["quantity"].value;
  err = document.getElementById("quantityErr");
  input = document.getElementById("quantity");
  if (!quantity) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Set the quantity of the product!";
    return false;
  }
  //validate address
  err.textContent = "";
  input.style.borderColor = "";
  let location = document.forms["regForm"]["location"].value;
  err = document.getElementById("locationErr");
  input = document.getElementById("location");
  if (!location) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Set the direction of the product!";
    return false;
  }
  //validate produce type
  err.textContent = "";
  input.style.borderColor = "";
  let produce_type = document.forms["regForm"]["produce_type"].value;
  err = document.getElementById("typeErr");
  input = document.getElementById("produce_type");
  if (!produce_type) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Please specify the produce type!";
    return false;
  }
  //validate image
  err.textContent = "";
  input.style.borderColor = "";
  let image = document.forms["regForm"]["image"].value;
  err = document.getElementById("imageErr");
  input = document.getElementById("image");
  if (!image) {
    input.focus();
    input.style.borderColor = "red";
    err.textContent = "Please select the image of the product!";
    return false;
  }
  err.textContent = "";
  input.style.borderColor = "";
  let loader = `<button class="btn btn-success" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Uploading
                </button>`;
  document.getElementById("spinner").innerHTML = loader;
  const form = document.getElementById("regForm");
  form.style.display = "none";

  return true;
}
