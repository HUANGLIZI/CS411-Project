// show user table on web page
$("#user_navi").click(function() {
    // $("#pages").show()
    document.getElementById('pages').style.visibility='visible'
    base = "http://127.0.0.1:5000"
    $.ajax({
        type: "get",
        data: "",
        url: base+"/list_user",
        success: function(data) {
            console.log(data);
            attr_list = ['user_id', 'name', 'gender', 'phone', 'email', 'birth']
            var headh = '<th>user_id</th>\n'+'<th>name</th>\n'+'<th>gender</th>\n'+'<th>phone</th>\n'+'<th>email</th>'+'<th>birth</th>'+'<th>update</th>'+'<th>remove</th>'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td class="'+attr_list[j]+'">'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                html+='<td><button type="button" data-bs-toggle="modal" data-bs-target="#user_edit_modal" onclick="display_modal_user_update_item(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
                html+='<td><button type="button" onclick="user_delete_item(this.parentElement.parentElement)"><i class="fa fa-trash fa-1" ></i></button></td>'
                html+='</tr>'
                body_compo += html
            }
            $('#tbody').html(body_compo)
        },
        error: function() {
            console.log('Request Error.');
        }
    });
});



function display_modal_user_update_item(editting_line){
    // alert(editting_line);
    console.log(editting_line)
    $('#active_for_edit').removeAttr('id');
    editting_line.id = 'active_for_edit';
    var children = editting_line.children;
    // console.log(children)

    house_attrs = $('#table_head').children();
    var html=''
    for (var i = 0; i < children.length-2; i++) {

        var grandchildren = children[i].innerHTML;
        console.log(house_attrs[i].innerHTML)
        console.log(grandchildren)
        var one = '<div class="input-group mb-3">\n'+
            '<span class="input-group-text" >'+house_attrs[i].innerHTML+'</span>\n'+
            '<input type="text" class="form-control" id="'+house_attrs[i].innerHTML+'" value='+grandchildren+' aria-label="task-name" aria-describedby="basic-addon1">\n' +
            '</div>'
        html+=one
    }
    $('#user_edit_modal_body').html(html)
}

function user_delete_item(val){
    // alert(val);
    console.log(val)
    val.style.visibility='hidden'
    var children = val.children;
    // console.log(children)
    sss = $('#table_head').children();
    for (var i = 0; i < children.length-2; i++) {

        var grandchildren = children[i].innerHTML;
        // Do stuff
        console.log(sss[i].innerHTML)
        console.log(grandchildren)
        if (sss[i].innerHTML==='user_id'){
            base = "http://127.0.0.1:5000"
            let data = {"user_id":grandchildren}
            $.ajax({
                type: "delete",
                // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
                contentType: 'application/json',
                data: JSON.stringify(data),
                url: base+"/delete_user",
                success: function(data) {
                    console.log(data);
                },
                error: function() {
                    console.log('Request Error.');
                }
            });
        }
    }
}



// edit_user_table_modal_window_click_save_change
$('#update_user_modal_save_change').click(function() {
    console.log(document.getElementById('active_for_edit'))
    console.log($('#active_for_edit'))
    $('#active_for_edit .user_id').text($('#user_id').val())
    $('#active_for_edit .name').text($('#name').val())
    $('#active_for_edit .email').text($('#email').val())
    $('#active_for_edit .phone').text($('#phone').val())
    $('#active_for_edit .gender').text($('#gender').val())
    $('#active_for_edit .birth').text($('#birth').val())
    // ['user_id', 'name', 'email', 'phone', 'gender', 'birth']
    // console.log("user_id="+$('#user_id').val()+"&gender="+$('#gender').val())
    base = "http://127.0.0.1:5000"
    let data = {"user_id":$('#user_id').val(),"name":$('#name').val(),"email":$('#email').val(),"phone":$('#phone').val(),"gender":$('#gender').val()}
    console.log($('#user_id').val())
    $.ajax({
        type: "put",
        // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        url: base+"/update_user",
        success: function(data) {
        console.log(data);
        },
        error: function() {
        console.log('Request Error.');
        }
    });
});


$("#add_user_modal_save_change").click(function() {
    // console.log('add')
    base = "http://127.0.0.1:5000"
    let data = {"name":$('#add_user_modal_body > div > .name').val(),"email":$('#add_user_modal_body  > div > .email').val(),
        "phone":$('#add_user_modal_body > div > .phone').val(),"gender":$('#add_user_modal_body > div > .gender').val()}
    console.log(data)
    $.ajax({
        type: "post",
        // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        url: base+"/add_user",
        success: function(data) {
            console.log(data);
            alert('success')
        },
        error: function() {
            alert('Request Error.');

        }
    });
});


$('#exit').click(function() {

      window.location.href = 'login.html';
})