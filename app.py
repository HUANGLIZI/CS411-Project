import json
from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

mydb = mysql.connector.connect(
    host="104.197.229.194",
    user="root",
    password="",
    database="shareroom"
)

# local
# mydb = mysql.connector.connect(
#     host="127.0.0.1",
#     user="root",
#     password="123456",
#     database="sakila"
# )

app = Flask(__name__)
CORS(app)
# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM User limit 10")
# myresult = mycursor.fetchall()
#
# user_count = mycursor.rowcount
# print(user_count)
# mycursor = mydb.cursor()
# mycursor.execute("select max(UserID) from User")
# cnt = mycursor.fetchall()
# print(cnt)

@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    email = data["email"]
    password = data["pass"]
    mycursor = mydb.cursor()
    print(data)
    query = f"select UserID from User where Phone='{email}'"
    print(query)
    mycursor.execute(query)
    res = mycursor.fetchall()
    print(res)
    mydb.commit()
    mycursor.close()
    if str(res[0][0])==password:
        if password == '3692':
            return 'admin'
        else:
            return 'True'
    else:
        return 'False'


@app.route('/add_user', methods=['POST'])
def add_user():

    data = request.get_json()

    mycursor = mydb.cursor()
    mycursor.execute("select max(UserID) from User")
    cnt = mycursor.fetchall()

    user_ID = cnt[0][0]+1
    print(user_ID)

    query1 = "INSERT INTO User (UserID, Name, Gender, Phone, Email) VALUES (%s, %s, %s, %s, %s)"
    mycursor.execute(query1, (user_ID, data["name"], data["gender"], data["phone"], data["email"]))

    mydb.commit()
    mycursor.close()
    return '/register_user [POST] SUCCESS'


@app.route('/delete_user', methods=['DELETE'])
def delete_user():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = f"DELETE FROM User WHERE UserID = {data['user_id']}"
    mycursor.execute(query)
    mydb.commit()
    mycursor.close()
    return '/delete_user [DELETE] SUCCESS'


@app.route('/update_user', methods=['PUT'])
def update_user_info():
    data = request.get_json()
    print(data)
    mycursor = mydb.cursor()
    query = "UPDATE User SET Name = %s,  Email = %s, Phone = %s, Gender = %s WHERE UserID = %s"
    mycursor.execute(query, (data["name"], data["email"], data["phone"], data["gender"],  data["user_id"]))
    mydb.commit()
    mycursor.close()
    return '/update_user [PUT] SUCCESS'

@app.route('/search', methods=['GET'])
def search():
    data = request.args.get('query')
    print(data)
    mycursor = mydb.cursor()
    query = data
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)


@app.route('/search_user', methods=['GET'])
def search_user():
    data = request.args.get('name')
    mycursor = mydb.cursor()
    query = f"SELECT * FROM User WHERE Name like '{data}'"
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

@app.route('/list_user', methods=['GET'])
def list_user_by_page():
    data = request.args.get('name')
    mycursor = mydb.cursor()
    query = f"SELECT UserID, Name, Gender, Phone, Email, DATE_FORMAT(BirthDate, '%Y-%m-%d') FROM User limit 1000"
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret

@app.route('/advance_House', methods=['GET'])
def advance_house_by_page():
#     beds = request.args.get('beds')
    minp = request.args.get('minp')
    maxp = request.args.get('maxp')
    # print(beds, minp, maxp)
    mycursor = mydb.cursor()
    query = f"SELECT HouseID, Count(ContractID) as cc FROM Contract where HouseID in (select HouseID from House where Price>{minp} and Price<{maxp}) group by HouseID order by cc desc"
    print(query)
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret

@app.route('/advance_House_2', methods=['GET'])
def advance_house_by_page_2():
    Beds_data = request.args.get('beds')
    mycursor = mydb.cursor()
    query = f"SELECT HouseID, Count(ContractID) FROM Contract where HouseID in (select HouseID from House where Beds > {Beds_data}) group by HouseID"
    print(query)
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret


@app.route('/delete_house', methods=['DELETE'])
def delete_house():
    data = request.get_json()
    mycursor = mydb.cursor()
    query = f"DELETE FROM House WHERE HouseID = {data['house_id']}"
    mycursor.execute(query)
    mydb.commit()
    mycursor.close()
    return '/delete_house [DELETE] SUCCESS'


@app.route('/list_House', methods=['GET'])
def list_house_by_page():
    data = request.args.get('name')
    mycursor = mydb.cursor()
    query = f"SELECT * FROM House"
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret

@app.route('/reserve_house', methods=['PUT'])
def reserve_house():
    data = request.get_json()
    print(data)
    mycursor = mydb.cursor()
    query = "UPDATE House SET Beds = %s WHERE HouseID = %s"
    mycursor.execute(query, (data["beds"], data["houseid"]))
    mydb.commit()
    mycursor.close()
    return '/update_house [PUT] SUCCESS'

@app.route('/search_house', methods=['GET'])
def search_house():
    beds = request.args.get('beds')
    minp = request.args.get('minp')
    maxp = request.args.get('maxp')
    print(beds, minp, maxp)
    mycursor = mydb.cursor()
    query = f"SELECT * FROM House WHERE Beds={beds} and Price>={minp} and Price<={maxp}"
    print(query)
    mycursor.execute(query)
    res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    return jsonify(res)

@app.route('/procedure_House', methods=['PUT'])
def procedure_house_by_page():
    print(request.args)
    beds = request.args.get('beds')
    minp = request.args.get('minp')
    maxp = request.args.get('maxp')
    hostid = request.args.get('hostid')  # the HostID
    # print(data['host_id'])
    valuedif = request.args.get('valuedif')  # the price differences
    #  houseid = request.args.get('houseid')  # the HouseID
    print(beds, minp, maxp, hostid, valuedif)
    mycursor = mydb.cursor()
    #  query_1 = f"SELECT HouseID, Count(ContractID) FROM Contract where HouseID in (select HouseID from House where Price>{minp} and Price<{maxp} and Beds > {beds}) group by HouseID;" \
    #  mycursor.executemany(query_1)
    #  res1 = mycursor.fetchall()
    q0 = f"DROP PROCEDURE IF EXISTS shareroom.ggg"
    query1 = f"""
             Create procedure ggg(
	            OUT total INT
             ) 
             begin 
                 DECLARE done INT DEFAULT FALSE;
                 declare temp_HouseId int default 0;
                 declare cur cursor for(select HouseID from House where Price>{minp} and Price<{maxp} and Beds > {beds} and HostID ={hostid});
                 DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
                 
                 open cur; 
                 cloop: LOOP
                     FETCH cur into temp_HouseId;
                     if (done) THEN 
                        LEAVE cloop; 
                     elseif {minp}< 1000000 then
                        UPDATE House SET Price = Price+{valuedif} WHERE HouseID = temp_HouseId;
                     end if;
                 
                 END LOOP cloop;
                 close cur;
                 SELECT Count(*) into total FROM Contract where HouseID in (select HouseID from House where Price>{minp} and Price<{maxp} and Beds > {beds} and HostID ={hostid}) ;
             end;
             
    """
    # q2 = "call ggg();"
    mycursor.execute(q0)
    mycursor.execute(query1)
    # mycursor.execute(q2)
    res = mycursor.fetchall()
    print(res)
    mydb.commit()
    mycursor.close()
    #  re1 = jsonify(res1)
    #  ret1.headers.add('Access-Control-Allow-Origin', '*')
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret


@app.route('/call_procedure', methods=['GET'])
def procedure_house_by_pag1e():

    mycursor = mydb.cursor()
    # query = f"call ggg();"
    # mycursor.execute(query)
    a = 0
    res = mycursor.callproc('ggg', args=[a])
    print('ggg')
    # res = mycursor.fetchall()
    mydb.commit()
    mycursor.close()
    ret = jsonify(res)
    ret.headers.add('Access-Control-Allow-Origin', '*')
    return ret
app.run(debug=False)
