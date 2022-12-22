import requests

url = 'http://127.0.0.1:5000/call_procedure'
x = requests.get(url)
print(x.text)