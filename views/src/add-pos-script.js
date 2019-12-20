//TODO check empty fields

$("#new-pos-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/add-pos", //url that will get data from DB
        type: 'post',
        data: $('#new-pos-form').serialize(), //form data
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