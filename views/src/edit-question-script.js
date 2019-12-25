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

    // let url_string = window.location.href;
    // let url = new URL(url_string);
    // let QID = url.searchParams.get("id");
    // console.log(QID);
    // $.ajax({
    //     url: "/get-question",
    //     type: "post",
    //     data: {
    //         QID: QID
    //     },
    //     dataType: 'json',
    //     success: function (res) {
    //         if (res[0] !== "") {
    //             $('#text').val(res[0]['text']);
    //         }
    //     },
    //     error: function (err) {
    //         alert("Error:" + err.message);
    //     }
    //
    // })

$("#edit-question-form").submit(function (e) {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let QID = url.searchParams.get("id");

    e.preventDefault();
    $.ajax({
        url: "/edit-question", //url that will get data from DB
        type: 'post',
        data: {
            QID: QID,
            text: $('#text').val()
        }, //form data
        dataType: 'json',
        success: function (res) { ///logic for checking
            if(res['affectedRows'] === 1){
                console.log("Succesfully edited position " + QID);
                window.location.replace('http://localhost:3000/tests');
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }
    });

});
