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
        let form = document.createElement('form');
        form.id = ('exam-form');
        form.name = ("exam-form");
        div1.appendChild(form);
        for (let i = 0; i < res.data.length; i++) {
            let chkbx = document.createElement('input');
            chkbx.setAttribute('type', 'checkbox');
            chkbx.setAttribute('value', res.data[i]['TID']);
            chkbx.id = res.data[i]['TID'];
            chkbx.name = 'checkbox';

            let label = document.createElement('label');
            label.htmlFor = chkbx.id;
            label.appendChild(document.createTextNode(res.data[i]['type']));

            let sequence = document.createElement('input');
            sequence.setAttribute('type', 'number');
            sequence.setAttribute('min', '1');
            sequence.id = res.data[i]['TID'];
            sequence.name = 'sequence';


            let br = document.createElement('br');
            form.appendChild(chkbx);
            form.appendChild(label);
            form.appendChild(sequence);
            form.appendChild(br);
        }


        let date = document.createElement('input');
        date.setAttribute('type', 'date');
        date.name = "deadline";
        date.id = 'deadline';


        let dateLabel = document.createElement('label');
        dateLabel.htmlFor = date;
        dateLabel.appendChild(document.createTextNode('Deadline'));

        form.appendChild(dateLabel);
        form.appendChild(date);


        document.body.appendChild(div1);
        let saveBtn = document.createElement('input');
        saveBtn.id = 'save';
        saveBtn.setAttribute('type', 'submit');
        saveBtn.setAttribute('value', 'Save');
        document.body.appendChild(saveBtn);

        $(document).ready(function () {
            $('#deadline').on('change', function () {
                let today = new Date(Date.now()).toLocaleDateString();
                let datePicked = document.getElementById('deadline').value;
                if (Date.parse(today) > Date.parse(datePicked)) {
                    alert('Please select a correct date');
                }
            });
            $('#save').on('click', function () {
                let checkboxCounter = 0;
                let sequenceCounter = 0;
                let match = [];
                let previousID;
                let isArranged = [];
                $('#exam-form').find('input').each(function () {
                    if ($(this).is(':checkbox')) {
                        if ($(this).prop('checked')) {
                            previousID = $(this)[0].id;
                            checkboxCounter++;
                        }
                    }
                    if ($(this).attr('type') === 'number') {
                        if ($(this).val()) {
                            isArranged.push($(this).val());
                            match.push($(this)[0].id === previousID);
                            sequenceCounter++;
                        }
                    }

                });
                console.log(match);
                if (checkboxCounter === 0) {
                    alert("Please select at least one value");
                }
                else if (match.includes(false)) {
                    alert('Please match chosen tests and sequence!');
                }
                else if ((new Set(isArranged)).size !== isArranged.length) {
                    alert("Please correct sequence order!");
                }
                else if (checkboxCounter > 0) {
                    if (sequenceCounter === checkboxCounter || sequenceCounter === 0) {
                        let pageURL = window.location.href;
                        let email = pageURL.substr(pageURL.lastIndexOf('=') + 1);
                        console.log($('#exam-form').serialize());
                        $.ajax({
                            url: "/create-exam",
                            type: "post",
                            data: $('#exam-form').serialize() + '&email=' + email,
                            dataType: 'json',
                            success: function (res) {
                                if (res.data['affectedRows'] === 1) {
                                    window.location.replace('/hr-index'); //TODO change home page view to dynamically match user status
                                }
                            },
                            error: function (err) {
                                alert("Error:" + err.message);
                            }

                        });
                    }
                    else if (sequenceCounter < checkboxCounter) {
                        alert('Please choose a sequence for every chosen test!');
                    }
                }
            });

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
                        if (res.data['affectedRows'] === 1) {
                        }
                    },
                    error: function (err) {
                        alert("Error:" + err.message);
                    }

                });

            });

        }); //end on ready

    });


