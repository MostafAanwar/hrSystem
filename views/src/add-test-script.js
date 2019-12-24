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

$("#new-test-form").submit(function (e) {
    e.preventDefault();
    if (!$('input:text'.val)) {
        alert("Fill all fields!");
    }
    else {
        $.ajax({
            url: "/add-test", //url that will get data from DB
            type: 'post',
            data: $('#new-test-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res['affectedRows'] === 1) {
                    console.log("Added new test!");
                    window.location.replace('/tests');
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }
});