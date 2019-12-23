let url_string = window.location.href;
let url = new URL(url_string);
let tid = url.searchParams.get("TID");

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
        let dataTable = document.createElement("table");
        $.ajax({
            url: "/get-all-questions",
            type: "post",
            data: {
                TID: tid
            },
            async: false,
            dataType: 'json',
            success: function (res) {
                console.log(res);
                for (let i = 0; i < res.length; ++i) {
                    let tr = document.createElement('tr');
                    tr.id = res[i]['QID'];
                    let td = document.createElement('td');
                    td.className = ('column1');
                    let qText = document.createTextNode(res[i]['text']);
                    let editButton = document.createElement('button');
                    let editText = document.createTextNode('Edit');
                    editButton.className = ('edit');
                    editButton.id = res[i]['QID'];
                    let deleteButton = document.createElement('button');
                    let deleteText = document.createTextNode('Delete');
                    deleteButton.className = ('delete');
                    deleteButton.id = res[i]['QID'];
                    let addAnsButton = document.createElement('button');
                    let addAnsText = document.createTextNode('Add Answer');
                    addAnsButton.className = ('addA');
                    addAnsButton.id = res[i]['QID'];
                    td.appendChild(qText);
                    editButton.appendChild(editText); //
                    deleteButton.appendChild(deleteText);
                    addAnsButton.appendChild(addAnsText)
                    tr.appendChild(td);
                    tr.appendChild(editButton); //
                    tr.appendChild(deleteButton);
                    tr.appendChild(addAnsButton);
                    dataTable.appendChild(tr);
                    $.ajax({
                                url: "/get-all-answers",
                                type: "post",
                                data: {
                                    QID: res[i]["QID"]
                                },
                                async: false,
                                dataType: 'json',
                                success: function (res2) {
                                    for (let i = 0; i < res2.length; ++i) {
                                        let tr = document.createElement('tr');
                                        tr.id = res2[i]['AID'];
                                        let td = document.createElement('td');
                                        td.className = ('column1');
                                        let AText = document.createTextNode(res2[i]['textA']);
                                        let editAButton = document.createElement('button');
                                        let editAText = document.createTextNode('Edit');
                                        editAButton.className = ('editA');
                                        editAButton.id = res2[i]['AID'];
                                        let deleteAButton = document.createElement('button');
                                        let deleteAText = document.createTextNode('Delete');
                                        deleteAButton.className = ('deleteA');
                                        deleteAButton.id = res2[i]['AID'];
                                        td.appendChild(AText);
                                        editAButton.appendChild(editAText); //
                                        deleteAButton.appendChild(deleteAText);
                                        tr.appendChild(td);
                                        tr.appendChild(editAButton); //
                                        tr.appendChild(deleteAButton);
                                        dataTable.appendChild(tr);
                                    }

                                },
                                error: function (err) {
                                    alert("Error:" + err.message);
                                }
                            });

                }
                document.body.appendChild(dataTable);

            },
            error: function (err) {
                alert("Error:" + err.message);
            }
        });
        $(document).ready(function () {

            $(".deleteQ").on("click", function () {
                let PID = this.id;
                $.ajax({
                    url: "/delete-question",
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

            $('#addQ').on('click', function () {
                window.location.replace('/add-pos-page');
            });

            $('.editQ').on('click', function () {
                let PID = this.id;
                window.location.replace('/edit-question-page?id=' + PID);
            });
            $(".deleteA").on("click", function () {
                let QID = this.id;
                $.ajax({
                    url: "/delete-answer",
                    type: "post",
                    data: {
                        QID: QID
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res['affectedRows'] === 1) {
                            console.log("Deletion success!");
                            $('#' + QID +'').remove();
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }

                });

            });

            $('.addA').on('click', function () {
                window.location.replace('/add-answer-page');
            });

            $('.editA').on('click', function () {
                let AID = this.id;
                window.location.replace('/edit-answer-page?id=' + AID);
            });


            $('#search').on('keyup', function () {
                let searchString = $(this).val().toLowerCase();
                $('#pos-table tr').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1);
                });
            });
        });

    },
    error: function (err) {
        alert("Error:" + err.message);
    }

});
