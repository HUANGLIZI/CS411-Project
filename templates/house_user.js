
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
                +'<th>Beds</th>'+'<th>Price</th>'+'<th>HostID</th>'+'<th>reserve</th>'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td class="'+attr_list[j]+'">'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                html+='<td><button type="button" data-bs-toggle="modal" onclick="reserve(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
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
//

$('#search_house_button').click(function() {

    // alert("beds="+$('#bbbb').val()+"&min="+$('#mmmm').val()+"&max="+$('#mmmmm').val())
    base = "http://127.0.0.1:5000"
    $.ajax({
        type: "get",
        data: "beds="+$('#bbbb').val()+"&minp="+$('#mmmm').val()+"&maxp="+$('#mmmmm').val(),
        url: base+"/search_house",
        success: function(data) {
            console.log(data);
            attr_list = ['HouseID', 'HouseName', 'PropertyType', 'RoomType', 'Bedroom', 'Bathroom', 'Beds', 'Price', 'HostID']
            var headh = '<th>HouseID</th>\n'+'<th>HouseName</th>\n'+'<th>PropertyType</th>\n'+'<th>RoomType</th>\n'+'<th>Bedroom</th>\n'+'<th>Bathroom</th>\n'
                +'<th>Beds</th>'+'<th>Price</th>'+'<th>HostID</th>'+'<th>reserve</th>'
            $('#table_head').html(headh)
            body_compo = ''
            for (i=0;i<data.length;i++){
                // $('#as').html(data[i])
                var html ='<tr>'
                for (j=0;j<data[i].length;j++){html += '<td class="'+attr_list[j]+'">'+data[i][j]+'</td>'}
                // html+='<td><button onclick="dosomething(this.parentElement.parentElement)">update</button></td>\n'
                html+='<td><button type="button" data-bs-toggle="modal" onclick="reserve(this.parentElement.parentElement)"><i class="fa fa-pen fa-1"></i></button></td>'
                html+='</tr>'
                body_compo += html
            }
            $('#tbody').html(body_compo)
        },
        error: function() {
            console.log('Request Error.');
        }
    });
})


//house_table_delete_item
function reserve(editting_line){
    var children = editting_line.children;
    var houseid = children[0].innerHTML;
    var beds = parseInt(children[6].innerHTML)
    console.log(houseid)
    console.log(beds)
    if (beds ===0 ){
        alert('no bed available')
        return
    }
    children[6].innerHTML = beds-1
    base = "http://127.0.0.1:5000"
    let data = {"houseid":houseid, "beds":beds-1}
    $.ajax({
        type: "put",
        // data: "user_id="+$('#user_id').val()+"&gender="+$('#gender').val(),
        contentType: 'application/json',
        data: JSON.stringify(data),
        url: base+"/reserve_house",
        success: function(data) {
            console.log(data);
            alert('reserve successfully')
        },
        error: function() {
            console.log('Request Error.');
        }
    });


}


