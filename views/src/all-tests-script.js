let url = "http://localhost:3000/all-tests";

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

        let text1 = document.createTextNode('Test ID');
        let text2 = document.createTextNode('Test Type');



        th1.appendChild(text1);
        th2.appendChild(text2);

        tr.appendChild(th1);
        tr.appendChild(th2);

        thead.appendChild(tr);
        table.appendChild(thead);
        let tbody = document.createElement('tbody');
        tbody.id = ("tests-table");
        for (let i = 0; i < res.data.length; i++) {
            console.log(res.data.length);
            let tr = document.createElement('tr');
            tr.id = res.data[i]['TID'];
            let td1 = document.createElement('td');
            td1.className = ('column1');
            let text1 = document.createTextNode(res.data[i]['TID']);
            let td2 = document.createElement('td');
            td2.className = ('column2');
            let text2 = document.createTextNode(res.data[i]['type']);
            let editButton = document.createElement('button');
            let editText = document.createTextNode('Edit');
            editButton.className = ('edit');
            editButton.id = res.data[i]['TID'];
            let deleteButton = document.createElement('button');
            let deleteText = document.createTextNode('Delete');
            deleteButton.className = ('delete');
            deleteButton.id = res.data[i]['TID'];
            let detailsButton = document.createElement('button');
            let detailsText = document.createTextNode('Details');
            detailsButton.className = ('details');
            detailsButton.id = res.data[i]['TID'];

            td1.appendChild(text1);
            td2.appendChild(text2);

            editButton.appendChild(editText); //
            deleteButton.appendChild(deleteText);
            detailsButton.appendChild(detailsText);
            tr.appendChild(td1);
            tr.appendChild(td2);

            tr.appendChild(editButton); //
            tr.appendChild(deleteButton);
            tr.appendChild(detailsButton);
            table.appendChild(tr);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(div4);
        div4.appendChild(table);
        document.body.appendChild(div1);

        $(document).ready(function () {

            $(".delete").on("click", function () {
                let TID = this.id;
                $.ajax({
                    url: "/delete-test",
                    type: "post",
                    data: {
                        TID: TID
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res['affectedRows'] === 1) {
                            console.log("Deletion success!");
                            $('#' + TID +'').remove();
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }

                });

            });
            $(".details").on("click", function () {
                let TID = this.id;
                window.location.replace("/test-details?TID=" + TID);

            });

            $('#add').on('click', function () {
                window.location.replace('/add-test-page');
            });

            $('.edit').on('click', function () {
                let TID = this.id;
                window.location.replace('/edit-test-page?id=' + TID);
            });

            $('#search').on('keyup', function () {
                let searchString = $(this).val().toLowerCase();
                $('#tests-table tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1);
                });
            });
        }); //end on ready

    });


