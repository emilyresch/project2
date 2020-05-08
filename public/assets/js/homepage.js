var userInput = $("#user-input");
var passwordInput = $("#password-input");
console.log("hello");

var darkMode = false;

$("#signin-message").hide();
$("#login-section").css({opacity:0, visibility:"visible"}).animate({opacity:1});

$("#signUpButton").on("click", function (event) {
  event.preventDefault();
  var userData = {
    username: userInput.val().trim(),
    password: passwordInput.val().trim()
  };
  console.log("helloSignup");
  console.log(userData);
  if (!userData.username || !userData.password) {
    $("#signin-message").text("Account cannot be created!");
    $("#signin-message").css("color", "red");
    $("#signin-message").fadeIn().delay(3000).fadeOut();
    return;
  }
  signUpUser(userData.username, userData.password);
  $("#signin-message").text("Account successfully created!");
  $("#signin-message").css("color", "green");
  $("#signin-message").fadeIn().delay(3000).fadeOut();
  userInput.val("");
  passwordInput.val("");
});
function signUpUser(username, password) {
  $.post("/api/signup", {
    username: username,
    password: password
  })
    .then(function (data) {
      window.location.replace("/booksearch");
    })
    .catch(handleLoginErr);
}
function handleLoginErr(err) {
  $("#signin-message").text("Incorrect username or password!");
  $("#signin-message").css("color", "red");
  $("#signin-message").fadeIn().delay(3000).fadeOut();
}

$("#loginButton").on("click", function (event) {
  event.preventDefault();
  console.log("helloLogin");
  var userData = {
    username: userInput.val().trim(),
    password: passwordInput.val().trim()
  };
  console.log(userData);
  if (!userData.username || !userData.password) {
    $("#signin-message").text("Incorrect username or password!");
    $("#signin-message").css("color", "red");
    $("#signin-message").fadeIn().delay(3000).fadeOut();
    return;
  }
  loginUser(userData.username, userData.password);
  userInput.val("");
  passwordInput.val("");
});

function loginUser(username, password) {
  $.post("/api/login", {
    username: username,
    password: password
  })
    .then(function () {
      $("#login-section").css({opacity:1, visibility:"hidden"}).animate({opacity:0}, 200);
      window.location.replace("/booksearch");
    })
    .catch(function (err) {
      $("#signin-message").text("Incorrect username or password!");
      $("#signin-message").css("color", "red");
      $("#signin-message").fadeIn().delay(3000).fadeOut();
      console.log(err);
    });
}