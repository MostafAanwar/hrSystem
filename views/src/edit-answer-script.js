let sessionUrl = "http://localhost:3000/session";

fetch(sessionUrl, {
    mode: "cors",
    method: "POST"
})
    .then(session => {
        return session.json()
    })
    .then(session => {
        let welcomeMessage = "Welcome " + session['name'];
        document.getElementById("head").innerHTML = welcomeMessage;

    });
$(document).ready(function () {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let AID = url.searchParams.get("id");
    console.log(AID);
    $.ajax({
        url: "/get-answer",
        type: "post",
        data: {
            AID: AID
        },
        dataType: 'json',
        success: function (res1) {
            if (res1[0] !== "") {
                $('#text').val(res1[0]['textA']);
                $('#correct').prop("checked", res1[0]['correct']);
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }

    });
});
$("#edit-ans-form").submit(function (e) {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let AID = url.searchParams.get("AID");

    e.preventDefault();
    $.ajax({
        url: "/edit-answer", //url that will get data from DB
        type: 'post',
        data: {
            AID: AID,
            // textA: $('#text').val(),
            correct: $('#correct').prop('checked'),
        }, //form data
        dataType: 'json',
        success: function (res) { ///logic for checking
            if (res['affectedRows'] === 1) {
                console.log("Succesfully edited position " + AID);
                window.location.replace('/tests');
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }
    });

});