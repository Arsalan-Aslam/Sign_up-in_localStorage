// retrieving HTML elements from the DOM
const form = document.getElementById("form");
const username = document.getElementById("Name");
const email = document.getElementById("Email");
const phone = document.getElementById("Phone_Number");
const password = document.getElementById("Password");
const password2 = document.getElementById("Confirm_Password");

let emptyFields;
let passwordsMatch;

const users = JSON.parse(localStorage.getItem("usersData")) || [];

// Function to update class and message for error
function showError(input, message) {
  // Get the parent element of the input field (.form-control)
  const formControl = input.parentElement;
  // Replace the class - add error
  formControl.className = "form-control error";
  alert(`${message}`);
  // showPopup(message)
}

// Function to update class for success
function showSuccess(input) {
  // Get the parent element of the input field (.form-control)
  const formControl = input.parentElement;
  // Replace the class - add success
  formControl.className = "form-control success";
}

//Function to check if the required fields have data
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value === "") {
      showError(input, `${getFieldId(input)} is required`);
      emptyFields = true;
    } else {
      showSuccess(input);
      emptyFields = false;
    }
  });
}

// function fieldCheck(input) {
//   if (input.value === "") {
//     showError(input, `${getFieldId(input)} is required`);
//   }
// }

//Function to get the id of the input fields
function getFieldId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function to check if password and confirm password match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords don't match");
    passwordsMatch = false;
  } else {
    passwordsMatch = true;
  }
}

// Show password function
function showPassword() {
  if (password.getAttribute("type") === "password") {
    password.setAttribute("type", "text");
    password2.setAttribute("type", "text");
  } else {
    password.setAttribute("type", "password");
    password2.setAttribute("type", "password");
  }
}
//

// Event Listeners for sign up page
// Create event listener for submit button
form.addEventListener("submit", (e) => {
  // stop page from reloading on submit
  e.preventDefault();

  checkRequired([username, phone, email, password, password2]);
  // fieldCheck(username);
  // fieldCheck(phone);
  // fieldCheck(email);
  // fieldCheck(password);
  // fieldCheck(password2);
  checkPasswordsMatch(password, password2);
  const userIndex = users.findIndex((value) => value.email === email.value);
  console.log(userIndex);

  if (emptyFields === false) {
    if (passwordsMatch === true) {
      if (userIndex === -1) {
        const user = {
          username: username.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        };
        users.push(user);
        localStorage.setItem("usersData", JSON.stringify(users));
        alert("Signed up successfully!");
        window.location.assign("./login.html");
      } else {
        alert("Email already exists");
        email.parentElement.className = "form-control error";
      }
    }
  }
});

// login page
// const loginForm = document.getElementById("loginForm");

function showLoginPass() {
  const loginPass = document.getElementById("password");
  if (loginPass.getAttribute("type") === "password") {
    loginPass.setAttribute("type", "text");
  } else {
    loginPass.setAttribute("type", "password");
  }
}

const login = () => {
  // e.preventDefault();

  const loginEmail = document.getElementById("email");
  const loginPass = document.getElementById("password");
  const userData = JSON.parse(localStorage.getItem("usersData"));
  console.log(userData);
  const checkUser = userData.find((value) => {
    return (
      value.email === loginEmail.value && value.password === loginPass.value
    );
  });

  console.log(checkUser);
  if (checkUser) {
    localStorage.setItem("currentUser", JSON.stringify(checkUser));
    // alert("logged in successfully!");
    window.location.assign("./dashboard.html");
  } else {
    alert("Invalid login details");
  }
};

const info = document.getElementById("info");

const CurrentUser = () => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUserData);
  const data = document.createElement("div");

  data.classList.add("data");
  // console.log(currentUserData.username);
  data.innerHTML = `<table>
  <tr>
    <td>Name</td>
    <td>${currentUserData.username}</td>
  </tr>
  <tr>
    <td>Email</td>
    <td>${currentUserData.email}</td>
  </tr>
  <tr>
    <td>Phone No.</td>
    <td>${currentUserData.phone}</td>
  </tr>
  <tr>
    <td>Password</td>
    <td>${currentUserData.password}</td>
  </tr>
  </table> `;

  console.log(data);
  info.appendChild(data);
};
window.onload = CurrentUser();

const logout = () => {
  localStorage.setItem("currentUser", "");
  window.location.assign("./login.html");
};

function showPopup(message) {
  // Get the modal
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  const p = document.getElementById("message");

  modal.style.display = "block";
  p.innerHTML = message;
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
