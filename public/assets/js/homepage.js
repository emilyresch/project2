// import {MDCSwitch} from '@material/switch';

// const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));

// $(".mdc-switch").on("click", function(e) {
//     e.preventDefault();
    
// });

var userInput = $("#user-input");
var passwordInput = $("#password-input");
console.log("hello");

$("#signUpButton").on("click", function(event){
event.preventDefault();
 var userData = {
        username:  userInput.val().trim(),
        password: passwordInput.val().trim()
    };
    console.log("helloSignup");
    console.log(userData);   
    if(!userData.username || !userData.password){
        // alert("")
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
        // alert("")
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
        console.log(err);
      });
}