let url = "http://localhost:3000/get-test-types";

fetch(url, {
    mode: "cors",
    method: "GET"
})
    .then(res => {
        return res.json()
    })
    .then(res => {
        let div1 = document.createElement('div');
        for (let i = 0; i < res.data.length; i++) {
            console.log(res.data.length);
            let chkbx = document.createElement('input');
            chkbx.setAttribute('type', 'checkbox');
            chkbx.setAttribute('value', res.data[i]['type']);
            chkbx.id = res.data[i]['type'];
            chkbx.className = ("test-types");

            let label = document.createElement('label');
            label.htmlFor = chkbx.id;
            label.appendChild(document.createTextNode(res.data[i]['type']));


            let br = document.createElement('br');
            div1.appendChild(chkbx);
            div1.appendChild(label);
            div1.appendChild(br);
        }
        document.body.appendChild(div1);
        let saveBtn = document.createElement('input');
        saveBtn.setAttribute('type', 'submit');
        saveBtn.setAttribute('value', 'Save');
        document.body.appendChild(saveBtn);
        $(document).ready(function () {

            $(".delete").on("click", function () {
                let PID = this.id;
                $.ajax({
                    url: "/delete-pos",
                    type: "post",
                    data: {
                        PID: PID
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res['affectedRows'] === 1) {
                            console.log("Deletion success!");
                            $('#' + PID +'').remove();
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }

                });

            });

            $('#add').on('click', function () {
                window.location.replace('/add-pos-page');
            });

            $('.edit').on('click', function () {
                let PID = this.id;
                window.location.replace('/edit-pos-page?id=' + PID);
            });

            $('#search').on('keyup', function () {
                let searchString = $(this).val().toLowerCase();
                $('#pos-table tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1);
                });
            });
        }); //end on ready

    });


