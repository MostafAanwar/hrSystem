let url = "http://localhost:3000/get-app";

fetch(url, {
    mode: "cors",
    method: "GET"
})
    .then(res => {
        console.log(res);
        return res.json();
    })
    .then(res => {
        console.log(res.data);
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


        let text1 = document.createTextNode('Email');
        let text2 = document.createTextNode('Name');
        let text3 = document.createTextNode('Telephone');
        let text4 = document.createTextNode("CV");

        th1.appendChild(text1);
        th2.appendChild(text2);
        th3.appendChild(text3);
        th4.appendChild(text4);


        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);

        thead.appendChild(tr);
        table.appendChild(thead);

        let form = document.createElement("form");
        form.setAttribute('method', 'post');
        form.id = ('app-form');

        let tbody = document.createElement('tbody');
        tbody.id = ("app-table");
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

            let create = document.createElement('input');
            create.setAttribute('type', 'button');
            create.setAttribute('id', res.data[i]['email']);
            create.setAttribute('class', 'create-exam');
            create.setAttribute('value', 'Create Exam');


            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);


            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            tr.appendChild(cvLink);
            tr.appendChild(create);


            table.appendChild(tr);
            tbody.appendChild(tr);
        }


        table.appendChild(tbody);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);
        div4.appendChild(form);
        form.appendChild(table);

        document.body.appendChild(div1);

        $(document).ready(function () {

            $('#search').on('keyup', function () {
                let searchString = $(this).val().toLowerCase();
                $('#app-table tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1);
                });
            });

            $('.create-exam').on('click', function () {
                let email = this.id;
                window.location.replace('/create-exam-page?email=' + email);
            });


        }); //end on ready

    });
// });




