
// load_house_table_data_page_by_page
$("#house_navi").click(function() {
    // $("#pages").show()
    global_which_page = 'house'
    document.getElementById('pages').style.visibility='visible'
    base = "http://127.0.0.1:5000"
    $.ajax({
        type: "get",
        data: "name=J%",
        url: base+"/list_House",
        success: function(data) {
            console.log(data);
            attr_list = ['HouseID', 'HouseName', 'PropertyType', 'RoomType', 'Bedroom', 'Bathroom', 'Beds', 'Price', 'HostID']
            var headh = '<th>HouseID</th>\n'+'<th>HouseName</th>\n'+'<th>PropertyType</th>\n'+'<th>RoomType</th>\n'+'<th>Bedroom</th>\n'+'<th>Bathroom</th>\n'
                +'<th>Beds</th>'+'<th>Price</th>'+'<th>HostID</th>'+'<th>update</th>'+'<th>remove</th>'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td class="'+attr_list[j]+'">'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                html+='<td><button type="button" data-bs-toggle="modal" data-bs-target="#house_edit_modal" onclick="display_modal_house_update_item(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
                html+='<td><button type="button" onclick="house_delete_item(this.parentElement.parentElement)"><i class="fa fa-trash fa-1" ></i></button></td>'
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


//house_table_edit_item
function display_modal_house_update_item(editting_line){
    // alert(editting_line);
    console.log(editting_line)
    $('#house_active_for_edit').removeAttr('id');
    editting_line.id = 'house_active_for_edit';
    var children = editting_line.children;
    // console.log(children)

    sss = $('#table_head').children();
    var html=''
    for (var i = 0; i < children.length-2; i++) {

        var grandchildren = children[i].innerHTML;
        console.log(sss[i].innerHTML)
        console.log(grandchildren)
        var one = '<div class="input-group mb-3">\n'+
            '<span class="input-group-text" >'+sss[i].innerHTML+'</span>\n'+
            '<input type="text" class="form-control" id="'+sss[i].innerHTML+'" value='+grandchildren+' aria-label="task-name" aria-describedby="basic-addon1">\n' +
            '</div>'
        html+=one
    }
    $('#house_edit_modal_body').html(html)
}

//house_table_delete_item
function house_delete_item(val){
    // alert(val);
    console.log(val)

    var children = val.children;
    // console.log(children)
    sss = $('#table_head').children();
    for (var i = 0; i < children.length-2; i++) {

        var grandchildren = children[i].innerHTML;
        // Do stuff
        console.log(sss[i].innerHTML)
        console.log(grandchildren)
        if (sss[i].innerHTML==='HouseID'){
            base = "http://127.0.0.1:5000"
            let data = {"house_id":grandchildren}
            $.ajax({
                type: "delete",
                // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
                contentType: 'application/json',
                data: JSON.stringify(data),
                url: base+"/delete_house",
                success: function(data) {
                    val.style.visibility='hidden'
                    console.log(data);
                },
                error: function() {
                    alert('Cannot delete or update this row: there exists contract on this house!');
                }
            });
        }
    }
}

