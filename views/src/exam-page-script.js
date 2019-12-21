let url = "http://localhost:3000/exam";

fetch(url, {
    mode: "cors",
    method: "POST"
})
    .then(res =>{
        return res.json()
    })
    .then(res => {
        console.log(res);
        if(res.data.length == 0){
            window.location.replace('/success');
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
        }

        $(".button").on("click", function () {

            let TID = this.id;
            window.location.replace("/view-test?TID=" + TID);

        })
    });