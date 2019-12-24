//TODO check empty fields

$("#new-question-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/add-answer", //url that will get data from DB
        type: 'post',
        data: $('#new-question-form').serialize(), //form data
        dataType: 'json',
        success: function (res) { ///logic for checking
            if(res['affectedRows'] === 1){
                console.log("Added new position!");
                window.location.replace('/get-positions');
            }
        },
        error: function (err) {
            alert("Error:" + err.message);
        }
    });

});