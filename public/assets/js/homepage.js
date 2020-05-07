var userInput = $("#user-input");
var passwordInput = $("#password-input");
console.log("hello");

$("#signin-error-message").hide();

$("#signUpButton").on("click", function(event){
event.preventDefault();
 var userData = {
        username:  userInput.val().trim(),
        password: passwordInput.val().trim()
    };
    console.log("helloSignup");
    console.log(userData);   
    if(!userData.username || !userData.password){
      $("#signin-error-message").fadeIn().delay(3000).fadeOut();
        return;
    }
    signUpUser(userData.username, userData.password);
    userInput.val("");
    passwordInput.val("");
});
function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password
    })
      .then(function(data) {
        window.location.replace("/api/booksearch");
      })
      .catch(handleLoginErr);
}
function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
    $("#signin-error-message").fadeIn().delay(3000).fadeOut();
}

$("#loginButton").on("click", function(event){
    event.preventDefault();
    console.log("helloLogin");
    var userData = {
        username:  userInput.val().trim(),
        password: passwordInput.val().trim()
    };
    console.log(userData);   
    if(!userData.username || !userData.password){
      $("#signin-error-message").fadeIn().delay(3000).fadeOut();
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
      .then(function() {
        window.location.replace("/api/booksearch");
      })
      .catch(function(err) {
        $("#signin-error-message").fadeIn().delay(3000).fadeOut();
        console.log(err);
      });
}