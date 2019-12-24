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
    });

let url = "http://localhost:3000/exam";

fetch(url, {
    mode: "cors",
    method: "POST"
})
    .then(res => {
        return res.json()
    })
    .then(res => {
        if (res.data.length == 0) {
            window.location.replace('/success');
        }
        if (res.data[0]['sequence'] != null) {
            res.data.sort(function (a, b) {
                console.log(a.sequence);
                console.log(b.sequence);
                console.log(a.sequence > b.sequence);
                if (a.sequence > b.sequence) return 1;
                else return -1;
            });
            console.log(res.data);
        }
        for (let i = 0; i < res.data.length; i++) {
            $.ajax({
                url: "/test-type",
                type: "post",
                data: {
                    TID: res.data[i]['TID']
                },
                async: false,
                dataType: 'json',
                success: function (res2) {
                    console.log(res2);
                    let buttons = document.createElement('button');
                    let buttonText = document.createTextNode(res2[0]['type']);
                    buttons.className = ('button');
                    buttons.id = res.data[i]['TID'];
                    console.log(res.data[i]['TID']);
                    buttons.appendChild(buttonText);
                    document.body.appendChild(buttons);
                },
                error: function (err) {
                    alert("Error:" + err.message);
                }
            });
            if (res.data[i]['sequence'] != null)
                break;
        }
        $(".button").on("click", function () {

            let TID = this.id;
            window.location.replace("/view-test?TID=" + TID);

        })
    });