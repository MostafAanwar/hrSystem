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

let url = "http://localhost:3000/get-reg";

fetch(url, {
    mode: "cors",
    method: "GET"
})
    .then(res => {
        return res.json()
    })
    .then(res => {

        let div1 = document.createElement('div');
        div1.className = "limiter";
        let div2 = document.createElement('div');
        div2.className = "container-table100";
        let div3 = document.createElement('div');
        div3.className = "wrap-table100";
        let div4 = document.createElement('div');
        div4.className = "table100";

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');
        tr.className = ("table100-head");
        let th1 = document.createElement('th');
        th1.className = ('column1');
        let th2 = document.createElement('th');
        th2.className = ('column2');
        let th3 = document.createElement('th');
        th3.className = ('column3');
        let th4 = document.createElement('th');
        th4.className = ('column4');
        let th5 = document.createElement('th');
        th5.className = ('column5');
        let th6 = document.createElement('th');
        th6.className = ('column6');

        let text1 = document.createTextNode('Email');
        let text2 = document.createTextNode('Name');
        let text3 = document.createTextNode('Telephone');
        let text4 = document.createTextNode("Approve");
        let text5 = document.createTextNode("Reject");
        let text6 = document.createTextNode("CV");


        th1.appendChild(text1);
        th2.appendChild(text2);
        th3.appendChild(text3);
        th4.appendChild(text4);
        th5.appendChild(text5);
        th6.appendChild(text6);

        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);

        thead.appendChild(tr);
        table.appendChild(thead);

        let form = document.createElement("form");
        form.setAttribute('method', 'post');
        form.id = ('reg-form');

        let tbody = document.createElement('tbody');
        tbody.id = ("reg-table");
        for (let i = 0; i < res.data.length; i++) {
            console.log(res.data.length);
            let tr = document.createElement('tr');
            tr.id = res.data[i]['email'];
            let td1 = document.createElement('td');
            td1.className = ('column1');
            let text1 = document.createTextNode(res.data[i]['email']);
            let td2 = document.createElement('td');
            td2.className = ('column2');
            let text2 = document.createTextNode(res.data[i]['username']);
            let td3 = document.createElement('td');
            td3.className = ('column3');
            let text3 = document.createTextNode(res.data[i]['telephone']);


            let cvLink = document.createElement('a');
            cvLink.id = (res.data[i]['cv']);
            let url = res.data[i]['cv'];
            cvLink.setAttribute('href', '/get-cv?file=' + url);
            cvLink.setAttribute('download', '');
            cvLink.innerHTML = "View";
            cvLink.className = ('cv');
            document.body.appendChild(cvLink);
            let approve = document.createElement('input');
            approve.setAttribute('type', 'radio');
            approve.setAttribute('value', '1',);
            approve.setAttribute('name', res.data[i]['email']);
            approve.setAttribute('id', 'approve');

            let reject = document.createElement('input');
            reject.setAttribute('type', 'radio');
            reject.setAttribute('value', '0');
            reject.setAttribute('name', res.data[i]['email']);
            reject.setAttribute('id', 'reject');

            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);


            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);


            tr.appendChild(approve);
            tr.appendChild(reject);
            tr.appendChild(cvLink);
            table.appendChild(tr);
            tbody.appendChild(tr);
        }
        let saveBtn = document.createElement('input');
        saveBtn.setAttribute('type', 'submit');
        saveBtn.setAttribute('value', 'Save');
        tbody.appendChild(saveBtn);


        table.appendChild(tbody);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);
        div4.appendChild(form);
        form.appendChild(table);

        document.body.appendChild(div1);
        if (res.data.length === 0) {
            saveBtn.setAttribute("disabled", "true");
        }
        $(document).ready(function () {

            $('#search').on('keyup', function () {
                let searchString = $(this).val().toLowerCase();
                $('#reg-table tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1);
                });
            });

            $('#reg-form').on('submit', function (e) {
                e.preventDefault();
                $.ajax({
                    url: "/alter-approval", //url that will get data from DB
                    type: 'post',
                    data: $('#reg-form').serialize(), //form data
                    dataType: 'json',
                    success: function (res) { ///logic for checking
                        if (res.data['affectedRows'] >= 1) {
                            console.log("Success!");
                            window.location.replace('/hr-index');
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }
                });
            });

        }); //end on ready

    });
// });




