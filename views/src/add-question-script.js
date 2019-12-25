let sessionURL = "http://localhost:3000/session";
fetch(sessionURL, {
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

let url_string = window.location.href;
let url = new URL(url_string);
let tid = url.searchParams.get("TID");

$("#new-question-form").submit(function (e) {
    e.preventDefault();
    if (!$('input:text'.val)) {
        alert("Fill all fields!");
    }
    else {
        console.log($("textarea").val());
        $.ajax({
            url: "/add-question", //url that will get data from DB
            type: 'post',
            data: {
                text: $("textarea").val(),
                TID: tid
            },
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res['affectedRows'] === 1) {
                    console.log("Added new question!");
                    window.location.replace('/test-details?TID=' + tid);
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }

});