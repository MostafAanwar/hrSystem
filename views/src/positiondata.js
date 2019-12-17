$("#PosForm").submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: "/saveCandidatePosition", //url that will get data from DB
        type: 'post',
        data: $('#PosForm').serialize(), //form data
        dataType: 'json'
    });
});


