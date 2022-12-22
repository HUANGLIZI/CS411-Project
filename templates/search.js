$("#search_modal_save_change").click(function() {
    // console.log('add')
    console.log('dddddddd')
    base = "http://127.0.0.1:5000"
    // let data = {"Beds":parseInt(),"Price_low":parseInt(),
    //     "Price_high":parseInt($('#search_modal_body > div > .maxp').val())}
    // console.log(data)
    $.ajax({
        type: "get",
        data: "query="+$('#search_query').val(),
        url: base+"/search",
        success: function(data) {
            console.log(data);
            // attr_list = ['HouseID', 'HouseName', 'RoomType', 'ContractNum']
            var headh = '<th></th>\n'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td>'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                // html+='<td><button type="button" data-bs-toggle="modal" data-bs-target="#user_edit_modal" onclick="display_modal_user_update_item(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
                // html+='<td><button type="button" onclick="user_delete_item(this.parentElement.parentElement)"><i class="fa fa-trash fa-1" ></i></button></td>'
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

$("#search_modal_save_change2").click(function() {
    // console.log('add')
    console.log('dddddddd')
    base = "http://127.0.0.1:5000"
    // let data = {"Beds":parseInt(),"Price_low":parseInt(),
    //     "Price_high":parseInt($('#search_modal_body > div > .maxp').val())}
    // console.log(data)
    $.ajax({
        type: "get",
        data: "beds="+$('#search_modal_body > div > .beds').val(),
        // contentType: 'application/json',
        // data: JSON.stringify(data),
        url: base+"/House_2",
        success: function(data) {
            console.log(data);
            attr_list = ['HouseID', 'HouseName', 'RoomType', 'ContractNum']
            var headh = '<th>HouseID</th>\n'+'<th>HouseName</th>\n'+'<th>RoomType</th>\n'+'<th>ContractNum</th>\n'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td class="'+attr_list[j]+'">'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                // html+='<td><button type="button" data-bs-toggle="modal" data-bs-target="#user_edit_modal" onclick="display_modal_user_update_item(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
                // html+='<td><button type="button" onclick="user_delete_item(this.parentElement.parentElement)"><i class="fa fa-trash fa-1" ></i></button></td>'
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
// $("#add_modal_save_change").click(function() {
//     console.log('dddd')
//     console.log()
//     if ($("#add_to_which_tab").val()==='user'){
//         $('#search_modal_save_change').modal('show');
//     }
// });