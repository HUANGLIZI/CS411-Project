$(document).ready(function() {
    $("#form").submit(function(event){

        event.preventDefault();
        base = "http://127.0.0.1:5000"
        let data = {"email":$('#exampleInputEmail1').val(), "pass":$('#exampleInputPassword1').val()}
        console.log(data)
        $.ajax({
            type: "post",
            // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
            contentType: 'application/json',
            data: JSON.stringify(data),
            url: base+"/login",
            success: function(data) {
                console.log(data);
                if (data=== 'admin') {
                    window.location.href = 'index.html';
                }else if(data==='True'){
                    window.location.href = 'user.html';
                }
                else{
                    alert('login fail');
                }
            },
            error: function() {
                alert('login fail');
            }
        });


    });
});

// $("#loginb").click(function() {
//     // console.log('add')
//     base = "http://127.0.0.1:5000"
//     let data = {"name":$('#inputs > div > #email').val()}
//     console.log(data)
//     $.ajax({
//         type: "post",
//         // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
//         contentType: 'application/json',
//         data: JSON.stringify(data),
//         url: base+"/add_user",
//         success: function(data) {
//             console.log(data);
//             alert('success')
//         },
//         error: function() {
//             alert('Request Error.');
//
//         }
//     });
// });