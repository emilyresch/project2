// import {MDCSwitch} from '@material/switch';

// const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));

// $(".mdc-switch").on("click", function(e) {
//     e.preventDefault();
    
// });

// import {MDCSwitch} from '@material/switch';

// const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));

// $(".mdc-switch").on("click", function(e) {
//     e.preventDefault();
    
// });

$(function() {
    var userInput = $("#user-input");
    var passwordInput = $("#password-input");

    // $("#favouriteButton").on("click", function(){
    //     $("#row2").hide();
    // });

    $("#signUpButton").on("click", function(event){
        event.preventDefault();
        var userData = {
            username:  userInput.val().trim(),
            password: passwordInput.val().trim()
        };
        console.log("helloSignup");
        console.log(userData);   
        if(!userData.username || !userData.password){
            alert("")
            return;
        }

    });

    // $("#loginButton").on("click", function(event){
    //     event.preventDefault();
    //     console.log("helloLogin");
    // });
});