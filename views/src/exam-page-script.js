let sessionUrl = "http://localhost:3000/session";

fetch(sessionUrl, {
    mode: "cors",
    method: "POST"
})
    .then(res => {
        console.log("dd");
        console.log(res);
        return res.json();
    })
    .then(res => {
        console.log('ddd');
        console.log(res);
        console.log(res['username']);
        if (res['username']) {
            let welcomeMessage = "Welcome " + res['username'];
            document.getElementById("head").innerHTML = welcomeMessage;
        }
        else {
            let url_string = window.location.href;
            let redirectPage = url_string.substr(url_string.lastIndexOf('/') + 1);
            console.log(url_string);
            console.log("red " + redirectPage);
            window.location.replace('/?redirect=' + redirectPage);
        }
        // return res

        $.ajax({
            url: "/exam",
            type: "post",
            data: {
                email: res['email']
            },
            async: false,
            dataType: 'json',
            success: function (res1) {

                if (res1.data.length == 0) {
                    window.location.replace('/success');
                }
                if (res1.data[0]['sequence'] != null) {
                    res1.data.sort(function (a, b) {
                        console.log(a.sequence);
                        console.log(b.sequence);
                        console.log(a.sequence > b.sequence);
                        if (a.sequence > b.sequence) return 1;
                        else return -1;
                    });
                    console.log(res1.data);
                }
                for (let i = 0; i < res1.data.length; i++) {
                    $.ajax({
                        url: "/test-type",
                        type: "post",
                        data: {
                            TID: res1.data[i]['TID']
                        },
                        async: false,
                        dataType: 'json',
                        success: function (res2) {
                            console.log(res2);
                            let buttons = document.createElement('button');
                            let buttonText = document.createTextNode(res2[0]['type']);
                            buttons.className = ('button');
                            buttons.id = res1.data[i]['TID'];
                            console.log(res1.data[i]['TID']);
                            buttons.appendChild(buttonText);
                            document.body.appendChild(buttons);
                        },
                        error: function (err) {
                            alert("Error:" + err.message);
                        }
                    });
                    if (res1.data[i]['sequence'] != null)
                        break;
                }
                $(".button").on("click", function () {

                    let TID = this.id;
                    window.location.replace("/view-test?TID=" + TID);

                })
            },
            error: function (err) {
                alert("Error:" + err.message);
            }

        });
    });