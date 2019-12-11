//Makes sure email submitted follows correct format
function validateEmailFormat(form) {
    var email = document.getElementById("email").value;
    var format = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!format.test(email)){
        alert("Invalid email format!");
        return false;
        // form.email.focus();
    }
    return true;
}
//Makes sure that there are no empty fields
function checkEmptyFields(form) {
    if(form.email.value === ""){
        alert("Enter your email!");
        // form.email.focus();
        return false;
    }
    if(form.password.value === ""){
        alert("Enter your password!");
        // form.email.focus();
        return false;
    }
    return true;
}


