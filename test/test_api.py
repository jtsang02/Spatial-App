import requests

ENDPOINT = "http://localhost:9000"

# test that the endpoint is up and running
def test_can_call_endpoint():
    response = requests.get(ENDPOINT)
    assert response.status_code == 200

# test that the endpoint returns the correct data when all required data is provided
def test_can_calculate():
    payload = {    
        'h' : 4,
        'w' :  3,
        'LD' : 4.23,
        'actOpns' : 7,
        'sprk' : True,
        'group' : 'F-2'
        }
    response = requests.post(ENDPOINT + "/calculate", json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '58.33',
        'unprotectedOpenings': '88.30',
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# when missing non required data, numbers are calculated with defaults
def test_can_calculate_with_missing_data():
    payload = {    
        'h' : 4,
        'w' :  3,
        'LD' : 4.23,
        'sprk' : True,
        'group' : 'F-2'
        }
    response = requests.post(ENDPOINT + "/calculate", json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '88.30',
        'frr': '1 h',
        'construction': 'Combustible / EMT / Noncombustible',
        'cladding': 'Combustible / Noncombustible'
    }

# when limiting distance is less than 1.2 m, no openings are permitted
def test_no_openings_permitted():
    payload = {    
        'h' : 4,
        'w' :  3,
        'LD' : 1.1,
        'actOpns' : 0,
        'sprk' : True,
        'group' : 'C'
        }
    response = requests.post(ENDPOINT + "/calculate", json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '0.00',
        'frr': '1 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }

def test_min_openings_permitted():
    payload = {    
        'h' : 3,
        'w' :  4,
        'LD' : 1.2,
        'actOpns' : 0,
        'sprk' : False,
        'group' : 'E'
        }
    response = requests.post(ENDPOINT + "/calculate", json=payload)
    data = response.json()
    assert response.status_code == 200
    assert data == {
        'actualOpenings': '0.00',
        'unprotectedOpenings': '4.00',
        'frr': '2 h',
        'construction': 'Noncombustible',
        'cladding': 'Noncombustible'
    }
    
# run command python -m pytest -vv