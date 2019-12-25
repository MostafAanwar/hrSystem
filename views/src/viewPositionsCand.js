let sessionUrl = "http://localhost:3000/session";

fetch(sessionUrl, {
    mode: "cors",
    method: "POST"
})
    .then(session => {
        return session.json()
    })
    .then(session => {
        console.log(session);
        console.log(session['username']);
        let welcomeMessage = "Welcome " + session['username'];
        document.getElementById("head").innerHTML = welcomeMessage;

let url = "http://localhost:3000/position-cand";

fetch(url, {
    mode: "cors",
    method: "GET"
})
    .then(res => {
        return res.json()
    })
    .then(res => {
        console.log(res);

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

        // let text1 = document.createTextNode('Position ID');
        let text1 = document.createTextNode('Title');
        // let text3 = document.createTextNode('Availability');
        let text2 = document.createTextNode('Description');
        let text3 = document.createTextNode('Salary');

        //th0.appendChild(text0);
        th1.appendChild(text1);
        th2.appendChild(text2);
        th3.appendChild(text3);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        table.appendChild(thead);
        let tbody = document.createElement('tbody');
        for (let i = 0; i < res.data.length; i++) {
            console.log(res.data.length);
            let tr = document.createElement('tr');

            let td2 = document.createElement('td');
            td2.className = ('column2');
            let text2 = document.createTextNode(res.data[i]['title']);
            let td4 = document.createElement('td');
            td4.className = ('column4');
            let text4 = document.createTextNode(res.data[i]['description']);
            let td5 = document.createElement('td');
            td5.className = ('column5');
            let text5 = document.createTextNode(res.data[i]['salary']);
            let applyButton = document.createElement('button');
            let applyText = document.createTextNode('Apply');
            applyButton.className = ('apply');
            applyButton.id = res.data[i]['PID'];

            td2.appendChild(text2);
            td4.appendChild(text4);
            td5.appendChild(text5);
            applyButton.appendChild(applyText); //
            tr.appendChild(td2);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(applyButton); //
            // tr.appendChild(deleteButton);
            table.appendChild(tr);
            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        //form.appendChild(table);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);
        div4.appendChild(table);
        //div4.appendChild(table);
        document.body.appendChild(div1);

        $(document).ready(function () {
            $.ajax({
                url: '/is-applied',
                type: 'post',
                dataType: 'json',
                success: function (res) {
                    if (res.data[0]['PID']!= null) {
                        $('#msg').text('Your application is pending approval...');
                        $('.apply').attr("disabled", true);
                    }
                },
                error: function (err) {
                    alert("Error:" + err.message);
                }

            });

            $('.apply').on('click', function () {
                let PID = this.id;
                console.log(PID);
                $.ajax({
                    url: "/apply-pos",
                    type: "post",
                    data: {
                        PID: PID,
                        email: session['email']
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res['affectedRows'] === 1) {
                            $('#msg').text('Your application is pending approval...');
                            $('.apply').attr("disabled", true);
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }

                });

            });

        });
    });
    });
