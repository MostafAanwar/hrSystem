let url_string = window.location.href;
let url = new URL(url_string);
let email = url.searchParams.get("email");

$.ajax({
    url: "/detailed-tests",
    type: "post",
    data: {
        email: email
    },
    dataType: 'json',
    success: function (res) {
        console.log(res);
        console.log(res[0]['type']);
        let dataPlacer = document.createElement('div');
        for(let i = 0; i < res.length; i++) {
                let typePlacer = document.createElement('div');
                if(res[i]['type'] != res[res.length-1]['type']) { //handle last element
                    if (res[i]['type'] != res[i + 1]['type']) {
                        let testHeader = document.createElement('div');
                        let testType = document.createTextNode(res[i]['type'] + ": " + res[i]['test_score']);
                        testHeader.appendChild(testType);
                        typePlacer.appendChild(testHeader);
                    }
                }
                else{
                    if(res[i]['type'] != res[i-1]['type']){
                        let testHeader = document.createElement('div');
                        let testType = document.createTextNode(res[i]['type'] + ": " + res[i]['test_score']);
                        testHeader.appendChild(testType);
                        typePlacer.appendChild(testHeader);
                    }
                }
                let qHeader = document.createElement('div');
                let testQuestion = document.createTextNode(res[i]['text']);
                qHeader.appendChild(testQuestion);
                let ansHeader = document.createElement('div');
                let qAns = document.createTextNode(res[i]['textA']);
                ansHeader.appendChild(qAns);
                qHeader.appendChild(ansHeader);
                typePlacer.appendChild(qHeader);
                dataPlacer.appendChild(typePlacer);
                console.log("AAAAAA");
            }
            document.body.appendChild(dataPlacer);
    },
    error: function (err) {
        alert("Error:" + err.message);
    }

});