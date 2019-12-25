let sessionUrl = "http://localhost:3000/session";

fetch(sessionUrl, {
    mode: "cors",
    method: "POST"
})
    .then(res => {
        return res.json()
    })
    .then(res => {
        let welcomeMessage = "Welcome " + res['name'];
        document.getElementById("head").innerHTML = welcomeMessage;
    });

$(document).ready(function () {
    let pageURL = window.location.href;
    let PID = pageURL.substr(pageURL.lastIndexOf('=') + 1);
    $.ajax({
        url: "/get-pos",
        type: "post",
        data: {
            PID: PID
        },
        dataType: 'json',
        success: function (res) {
            if (res[0] !== "") {
                $('#title').val(res[0]['title']);
                $('#description').val(res[0]['description']);
                $('#salary').val(res[0]['salary']);
                $('#available').prop("checked", res[0]['available']);
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }

    })
});

$("#edit-pos-form").submit(function (e) {
    let pageURL = window.location.href;
    let PID = pageURL.substr(pageURL.lastIndexOf('=') + 1);

    e.preventDefault();
    let flag = true;
    $("#edit-pos-form").find('input').each(function () {
        if (!$(this).val()) {
            flag = false;
            alert('Fill all fields!');
        }
    });
    if (flag) {
        $.ajax({
            url: "/edit-pos", //url that will get data from DB
            type: 'post',
            data: {
                PID: PID,
                title: $('#title').val(),
                description: $('#description').val(),
                available: $('#available').prop('checked'),
                salary: $('#salary').val()
            }, //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res['affectedRows'] === 1) {
                    console.log("Succesfully edited position " + PID);
                    window.location.replace('/get-positions');
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }

});


