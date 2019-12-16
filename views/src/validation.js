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
        alert("please fill the empty fields!");
        return false;
    }
    if (username === "" && password !== "") {
        alert("please enter valid username");
        return false;
    }

    if (password === "" && username !== "") {
        alert("please enter a password");
        return false;
    }
    return true;
}

$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
}).on("blur", function () {
    if ($(this).val() === "")
        $(this).removeClass("focus");
});

$("#my-form").submit(function (e) {
    e.preventDefault();
    let initValidation = checkEmptyFields();
    if (initValidation) {
        $.ajax({
            url: '/getHR', //url that will get data from DB
            type: 'post',
            data: $('#my-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                console.log(res.result);

                alert(res.result);
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }
});



