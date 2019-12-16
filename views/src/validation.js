//Makes sure email submitted follows correct format //for sign up
function validateEmailFormat(form) {
    var email = document.getElementById("email").value;
    var format = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(email)) {
        alert("Invalid email format!");
        return false;
        // form.email.focus();
    }
    return true;
}

//Makes sure that there are no empty fields
function checkEmptyFields() {
    let username = document.forms["my-form"]["username"].value;
    let password = document.forms["my-form"]["password"].value;
    if (username === "" && password === "") {
        $('#validationtext').append("<p align='center'>please fill the empty fields!</p>");
        return false;
    }
    if (username === "" && password !== "") {
        $('#validationtext').append("<p align='center'>Username cannot be empty</p>");
        return false;
    }

    if (password === "" && username !== "") {
        $('#validationtext').append("<p align='center'>Password cannot be empty</p>");
        return false;
    }
    return true;
}

$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
    $('#validationtext').text("");

}).on("blur", function () {
    if ($(this).val() === "")
        $(this).removeClass("focus");
});

$("#my-form").submit(function (e) {
    e.preventDefault();
    let initValidation = checkEmptyFields();
    if (initValidation) {
        $.ajax({
            url: '/get-hr', //url that will get data from DB
            type: 'post',
            data: $('#my-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res.length > 0) {
                    window.location.replace('/hr-index');
                }
                else {
                    $('#validationtext').append("<p align='center'>Incorrect email or password! :(</p>");
                }

            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }
});



