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

$("#new-pos-form").submit(function (e) {
    e.preventDefault();
    let flag = true;
    $("#new-pos-form").find('input').each(function () {
        if (!$(this).val()) {
            flag = false;
            alert('Fill all fields!');
        }
    });
    if (flag) {
        $.ajax({
            url: "/add-pos", //url that will get data from DB
            type: 'post',
            data: $('#new-pos-form').serialize(), //form data
            dataType: 'json',
            success: function (res) { ///logic for checking
                if (res['affectedRows'] === 1) {
                    console.log("Added new position!");
                    window.location.replace('/get-positions');
                }
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
    }
});