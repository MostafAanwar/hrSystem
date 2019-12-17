$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
    $('#validationtext').text("");

}).on("blur", function () {
    if ($(this).val() === "")
        $(this).removeClass("focus");
});
//Makes sure email submitted follows correct format //for sign up
function validateEmailFormat() {
    let username = document.forms["my-form"]["username"].value;
    let format = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(username)) {
        $('#validationtext').append("<p align='center'>Invalid email format!</p>");
        return false;
    }
    return true;
}

//Makes sure that there are no empty fields
function checkEmptyFields() {
    let name = document.forms["my-form"]["name"].value;
    let username = document.forms["my-form"]["username"].value;
    let password = document.forms["my-form"]["password"].value;
    if (name === "" || username === "" || password === "") {
        $('#validationtext').append("<p align='center'>Cannot have empty fields</p>");
        return false;
    }
    return true;
}

$("#my-form").submit(function (e) {
    e.preventDefault();
    if (checkEmptyFields() && validateEmailFormat()) {
        $.ajax({
            url: "/add-user", //url that will get data from DB
            type: 'post',
            data: $('#my-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res.length > 0) {
                    window.location.replace('/');
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
