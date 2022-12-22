import requests

## add
# url = 'http://127.0.0.1:5000/add_user'
# # url = 'http://127.0.0.1:5000/advanced_query2'
#
# myobj = {'pass':'1720', 'email': '1234567894'}
# x = requests.post('http://127.0.0.1:5000/login', json=myobj)
# # x = requests.get(url)
# print(x.text)


## delete
# url = 'http://127.0.0.1:5000/delete_user'
# myobj = {'user_id':0}
# x = requests.delete(url, json=myobj)
# # x = requests.get(url)
# print(x.text)

## update
# url = 'http://127.0.0.1:5000/update_user'
# myobj = {'gender':'Female','user_id':15}
# x = requests.put(url, json=myobj)
# # x = requests.get(url)
# print(x.text)

## search
# url = 'http://127.0.0.1:5000/search_user?name=Sam%'
# x = requests.get(url)
# print(x.text)


## search
# url = 'http://127.0.0.1:5000/advance_House?Beds=0&Price_low=0&Price_high=1000'
# x = requests.get(url)
# print(x.text)
#
# ## search
# url = 'http://127.0.0.1:5000/advance_House_2?Beds=1'
# x = requests.get(url)
# print(x.text)

# url = 'http://127.0.0.1:5000/ggg?name=Sam%'
# x = requests.get(url)
# print(x.text)

## procedure
# url = 'http://127.0.0.1:5000/procedure_House?beds=0&minp=0&maxp=1000&hostid=4193&valuedif=0'
# x = requests.put(url)
# print(x.text)

## procedure
# url = 'http://127.0.0.1:5000/procedure_House?beds=1&minp=0&maxp=1000&hostid=4193&valuedif=0'
# x = requests.put(url)
# print(x.text)

# url = 'http://127.0.0.1:5000/search_house?beds=0&minp=0&maxp=1000'
# x = requests.get(url)
# print(x.text)

url = 'http://127.0.0.1:5000/reserve_house'
myobj = {'beds':3,'houseid':3335}
x = requests.put(url, json=myobj)
# x = requests.get(url)
print(x.text)