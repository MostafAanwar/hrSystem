$(".txtb input").on("focus", function () {
    $(this).addClass("focus");
    $('#validationtext').text("");

}).on("blur", function () {
    if ($(this).val() === "")
        $(this).removeClass("focus");
});
//Makes sure that there are no empty fields
function checkEmptyFields() {
    let email = document.forms["my-form"]["email"].value;
    let password = document.forms["my-form"]["password"].value;
    if (email === "" || password === "") {
        $('#validationtext').append("<p align='center'>Cannot have empty fields!</p>");
        return false;
    }

    return true;
}

$('#my-form').submit(function (e) {
    e.preventDefault();
    let pageURL = window.location.href;
    let url = pageURL.substr(pageURL.lastIndexOf('/'));
    console.log(url);
    ajaxValidation(url);

});

function ajaxValidation(sentURL){
    let initValidation = checkEmptyFields();
    console.log(sentURL);
    let url = "";
    if(sentURL === '/login-hr'){
        url = '/get-hr';
    }
    else if(sentURL === '/'){
        url = '/get-user';
    }
    if (initValidation) {
        $.ajax({
            url: url, //url that will get data from DB
            type: 'post',
            data: $('#my-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res.length > 0) {
                    if(sentURL === '/login-hr'){
                        window.location.replace('/hr-index');
                    }
                    if(sentURL === '/'){
                        window.location.replace('/home-page')
                    }
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

}




