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
let QID = url.searchParams.get("id");
console.log(QID);

$("#new-ans-form").submit(function (e) {
    e.preventDefault();
    if (!$('input:text'.val)) {
        alert("Fill all fields!");
    }
    else {
        console.log($("correct").val());
        $.ajax({
            url: "/add-answer", //url that will get data from DB
            type: 'post',
            data: {
                textA: $("input[name='text']").val(),
                correct: $("input[name='correct']").val(),
                QID: QID
            }, //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res['affectedRows'] === 1) {
                    console.log("Added new position!");
                    window.location.replace('/tests');
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }

});