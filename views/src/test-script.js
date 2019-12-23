let url_string = window.location.href;
let url = new URL(url_string);
let tid = url.searchParams.get("TID");

let cAns = [];
$.ajax({
    url: "/test-type",
    type: "post",
    data:{
        TID: tid
    },
    dataType: 'json',
    success: function(testInfo) {
        console.log(testInfo);
        document.getElementById("heading").innerHTML = testInfo[0]["type"] + " Exam";
        $.ajax({
            url: "/test-page",
            type: "post",
            data: {
                TID: tid
            },
            async: false,
            dataType: 'json',
            success: function (res) {
                let form = document.createElement('form');
                form.className = "submit";
                form.id = tid;
                for (let i = 0; i < res.length; ++i) {
                    let q = document.createElement('div');
                    let qText = document.createTextNode(res[i]["text"]);
                    q.className = res[i]["QID"];
                    q.appendChild(qText);
                    $.ajax({
                        url: "/test-page-c-answer",
                        type: "post",
                        data: {
                            QID: res[i]["QID"]
                        },
                        async: false,
                        dataType: 'json',
                        success: function (res2) {
                            console.log(res2);
                            let ansArrayText = [];
                            let ansArrayID =[];
                            ansArrayText.push(res2[0]["textA"]);
                            ansArrayID.push(res2[0]["AID"]);
                            cAns.push(res2[0]["AID"]);
                            $.ajax({
                                url: "/test-page-f-answers",
                                type: "post",
                                data: {
                                    QID: res[i]["QID"]
                                },
                                async: false,
                                dataType: 'json',
                                success: function (res3) {
                                    for (let j = 0; j < res3.length; ++j) {
                                        ansArrayText.push(res3[j]["textA"]);
                                        ansArrayID.push(res3[j]["AID"]);
                                    }
                                    console.log(ansArrayText);
                                    for (let k = 0; k < ansArrayText.length - 1; k++) {
                                        let ind = k + Math.floor(Math.random() * (ansArrayText.length - k));
                                        let temp = ansArrayText[ind];
                                        ansArrayText[ind] = ansArrayText[k];
                                        ansArrayText[k] = temp;
                                        let temp1 = ansArrayID[ind];
                                        ansArrayID[ind] = ansArrayID[k];
                                        ansArrayID[k] = temp1;
                                    }

                                    for (let x = 0; x < ansArrayText.length; x++) {
                                        let p = document.createElement("p");
                                        let rButton = document.createElement("input");
                                        rButton.setAttribute("type", "radio");
                                        rButton.name ="Q" + res[i]['QID'];
                                        rButton.id = ansArrayID[x];
                                        console.log(rButton.id);
                                        console.log(rButton.name);
                                        rButton.setAttribute("value", ansArrayText[x]);
                                        let ansText = document.createTextNode(ansArrayText[x]);
                                        console.log(ansText);
                                        p.appendChild(rButton);
                                        p.appendChild(ansText);
                                        q.appendChild(p);
                                    }
                                    let sButton = document.createElement("button");
                                    sButton.className = "save";
                                    sButton.id = res[i]['QID'];
                                    let sButtonText = document.createTextNode("Save Answer");
                                    sButton.appendChild(sButtonText);
                                    q.appendChild(sButton);
                                    form.appendChild(q);

                                },
                                error: function (err) {
                                    alert("Error:" + err.message);
                                }
                            });
                        },
                        error: function (err) {
                            alert("Error:" + err.message);
                        }
                    });
                }
                let subButton = document.createElement("input");
                subButton.className= "Submit";
                subButton.setAttribute("type", "submit");
                subButton.setAttribute("value", "submit");
                form.appendChild(subButton);
                document.body.appendChild(form);
            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
        let testScore = 0;
        $('.save').on('click',  function (e) {
            e.preventDefault();
            let QID = this.id;
            console.log(QID);
            let radios = document.getElementsByName("Q" + QID);
            console.log(radios);
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    for (let j = 0; j<cAns.length; j++) {
                        console.log(cAns.length);
                        console.log(cAns[j]);
                        if(cAns[j] == radios[i].id){
                            testScore+=1;
                        }
                    }
                    $.ajax({
                        url: "/save-answer", //url that will get data from DB
                        type: 'post',
                        data: {
                            AID: radios[i].id,
                            QID: this.id,
                            email: "habibaesmail@yahoo.com"
                        }, //form data
                        dataType: 'json',
                        async: false,
                        success: function (res) { ///logic for checking
                            if (res['affectedRows'] === 1) {
                                console.log("Saved");
                            }
                        },
                        error: function (err) {
                            alert("Error:" + err.message);
                        }
                    });

                    break;
                }
            }
        });
        $('.submit').on('submit',  function (e) {
            e.preventDefault();
            let TID = this.id;
            $.ajax({
                        url: "/save-score", //url that will get data from DB
                        type: 'post',
                        data: {
                            TID: TID,
                            email: "habibaesmail@yahoo.com",
                            test_score: testScore
                        }, //form data
                        dataType: 'json',
                        success: function (res) { ///logic for checking
                            if (res['affectedRows'] === 1) {
                                console.log("Saved");
                                window.location.replace('/get-exam');
                            }
                        },
                        error: function (err) {
                            alert("Error:" + err.message);
                        }
                    });
                })
    },
    error: function (err) {
        alert("Error:" + err.message);
    }

});
