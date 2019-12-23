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
    let TID = pageURL.substr(pageURL.lastIndexOf('=') + 1);
    $.ajax({
        url: "/test-type",
        type: "post",
        data: {
            TID: TID
        },
        dataType: 'json',
        success: function (res) {
            if (res[0] !== "") {
                $('#type').val(res[0]['type']);
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }

    })
});

$("#edit-test-form").submit(function (e) {
    let pageURL = window.location.href;
    let TID = pageURL.substr(pageURL.lastIndexOf('=') + 1);
    e.preventDefault();
    $.ajax({
        url: "/edit-test", //url that will get data from DB
        type: 'post',
        data: {
            TID: TID,
            type: $('#type').val(),
        }, //form data
        dataType: 'json',
        success: function (res) { ///logic for checking
            if (res['affectedRows'] === 1) {
                console.log("Succesfully edited test " + TID);
                window.location.replace('/tests');
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }
    });

});


