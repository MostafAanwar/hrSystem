$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
    $('#validationtext').text("");

}).on("blur", function () {
    if ($(this).val() === "")
        $(this).removeClass("focus");
});

//Makes sure email submitted follows correct format //for sign up
function validateEmailFormat() {
    let email = document.forms["my-form"]["email"].value;
    let format = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!format.test(email)) {
        $('#validationtext').append("<p align='center'>Invalid email format!</p>");
        return false;
    }
    return true;
}

//Makes sure that there are no empty fields
function checkEmptyFields() {
    let name = document.forms["my-form"]["name"].value;
    let email = document.forms["my-form"]["email"].value;
    let password = document.forms["my-form"]["password"].value;
    let file = document.forms["my-form"]["upload"].value;
    if (name === "" || email === "" || password === "" || file === "") {
        $('#validationtext').append("<p align='center'>Cannot have empty fields</p>");
        return false;
    }
    return true;
}

$("#my-form").submit(function (e) {
    e.preventDefault();
    console.log(document.getElementById('upload').files[0].name);
    if (checkEmptyFields() && validateEmailFormat()) {
        $.ajax({
            url: "/user-exist", //url that will get data from DB
            type: 'post',
            data: $('#my-form').serialize(), //form data
            dataType: 'json',
            success: function (res) {///logic for checking
                if (res.length == 0) {
                    $.ajax({
                            url: "/add-user",
                            type: 'post',
                            data: $('#my-form').serialize(),
                            dataType: 'json',
                            success: function (res) {
                                let formData = new FormData();
                                let file = document.getElementById("upload").files[0];
                                let email = document.getElementById('email').value;
                                formData.append("upload", file);
                                formData.append('email', email);

                                fetch('/upload-cv', {
                                    method: 'POST',
                                    body: formData
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        console.log(json.data.name);
                                        $.ajax({
                                            url: '/add-cv-path',
                                            type: 'post',
                                            data: {
                                                filename: json.data.name,
                                                email: email
                                            },
                                            dataType: 'json',
                                            success: function () {
                                                console.log("congrats");
                                                window.location.replace('/');
                                            },
                                            error: function () {

                                            }

                                        })

                                    })
                                    .catch(err => console.error(err));
                            },
                            error: function (err) {
                                alert("Error: " + err.message);
                            }
                        }
                    )
                    // window.location.replace('/');
                }
                else {
                    $('#validationtext').append("<p align='center'>You already have an account!</p>");
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }
});
