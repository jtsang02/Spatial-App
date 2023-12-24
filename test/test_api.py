import requests

ENDPOINT = "http://localhost:9000"


def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

def test_can_calculate():
    payload = {    
        "h" : 4,
        "w" :  3,
        "LD" : 4.23,
        "actOpns" : 7,
        "sprk" : True,
        "group" : "F-2"
        }
    response = requests.post(ENDPOINT + "/calculate", json=payload)
    assert response.status_code == 200
    
    data = response.json()

# run command python -m pytest